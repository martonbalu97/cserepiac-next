'use client'

import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal"
import TypeWriter from "@/app/typewriter/TypeWriter";
import {useEffect,useState, useMemo} from 'react'
import Heading from "../Heading";
import { categories, subCategs } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { sub } from "date-fns";
import CitySelect, { CitySelectValue } from "../inputs/CitySelect"
import dynamic from "next/dynamic";
import { latLng } from "leaflet";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    SUBCATEGORY = 1,
    LOCATION = 2,
    PRODNAME = 3,
    IMAGES = 4
    
}

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const router = useRouter()
    
    const [step,setSteps] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category:'',
            city:'',
            subcategory:'',
            title:'',
            description:'',
            imageSrc:''
        }
    });

    const category = watch('category');
    const subcategory = watch('subcategory')
    const city = watch('city')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr:false
    }),[city])

    const setCustomValue = (id:string, value:any) =>{
        setValue(id,value, {
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }

    const onBack = () =>{
        setSteps((value) => value - 1)
    };

    const onNext = () =>{
        setSteps((value) => value + 1)
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        if (step != STEPS.IMAGES){
            return onNext()
        }

        setIsLoading(true);

        console.log(data)
        axios.post('/api/termekek',data)
        .then(() =>{
            toast.success("Sikeres feltöltés!")
            router.refresh();
            reset();
            setSteps(STEPS.CATEGORY)
            uploadModal.onClose()
        })
        .catch(() =>{
            toast.error("Something went wrong!")
        })
        .finally(() =>{
            setIsLoading(false)
        })
    }

    const actionLabel = useMemo(() =>{
        if (step == STEPS.IMAGES){
        return 'Termék feltöltése'
        }

        return 'Következő'
    }, [step])

    const secondaryActionLabel = useMemo(() =>{
        if (step == STEPS.CATEGORY){
        return undefined
        }

        return 'Vissza'
    }, [step])

    let bodyContent = (
        <div
        className="flex flex-col gap-8"
        >
            <Heading
            title="Hova sorolnád a termékedet?"
            subtitle="Válassz a kategóriák közül.."
            />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h[50vh]
            overflow-y-auto
            "
            >
              {categories.map((item) =>(
                <div
                key={item.label}
                >
                   <CategoryInput
                   onClick={(category) => setCustomValue('category',category)}
                   selected={category == item.label}
                   label={item.label}
                   icon={item.icon}
                   />
                </div>
              ))}
            </div>
        </div>
    )

    if(step == STEPS.SUBCATEGORY){
        bodyContent = (
            <div
            className="flex flex-col gap-8"
            >
                 <Heading
                title={"A(z) " + category + " kategóriát választottad"}
                subtitle="Itt még pontosítanunk szükséges.."
                />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h[50vh]
            overflow-y-auto
            "
            >
                {subCategs.filter(categ => categ.category == category).map((item) =>(
                    <div
                        key={item.subcategory}
                >
                   <CategoryInput
                   onClick={(subcategory) => setCustomValue('subcategory',subcategory)}
                   selected={subcategory == item.subcategory}
                   label={item.subcategory}
                   icon={item.icon}
                   />
                    </div>
                ))}
            </div>
        </div>
        )
    }

    if(step == STEPS.LOCATION){
        const lalong = city.lat == undefined ? [47.1625,19.5033] : [Number(city.lat), Number(city.long)]
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Hol található a terméked?"
                subtitle="Segíts a piacozóknak hogy elérjenek hozzád.."
                />
                <CitySelect
                 onChange={(value) => setCustomValue('city', value)}
                 value={city as CitySelectValue}
                />
                <Map
                 center={lalong}
                />
            </div>
        )
    }

    if (step == STEPS.PRODNAME){
        bodyContent = (
            <div
            className="flex flex-col gap-8"
            >
               <Heading
               title="Hogyan írnád le a terméked?" 
               subtitle="A rövid és tömör leírás lesz a legjobb!"
               />
               <Input 
                id="title"
                label="Termék neve"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
               />
                <Input 
                id="description"
                label="Leírás"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
               />
            </div>
        )
    }

    if (step == STEPS.IMAGES){
        bodyContent = (
            <div
            className="flex flex-col gap-8"
            >
               <Heading
               title="Tölts fel néhány képet a termékről!" />
               <ImageUpload 
               value={imageSrc}
               onChange={(value) => setCustomValue('imageSrc',value)}
               />
               
            </div>
        )
    }




    return (
    <Modal
    title="Termék feltöltése"
    isOpen={uploadModal.isOpen}
    onClose={uploadModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    />
    )
}

export default UploadModal;
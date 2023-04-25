'use client'

import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal"
import TypeWriter from "@/app/typewriter/TypeWriter";
import {useEffect,useState, useMemo} from 'react'
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
    CATEGORY = 0,
    SUBCATEGORY = 1,
    PRODNAME = 2,
    DESCRIPTION = 3,
    IMAGES = 4
}

const UploadModal = () => {
    const uploadModal = useUploadModal();
    
    const [step,setSteps] = useState(STEPS.CATEGORY)

    const onBack = () =>{
        setSteps((value) => value - 1)
    };

    const onNext = () =>{
        setSteps((value) => value + 1)
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
                   onClick={() => {}}
                   selected={false}
                   label={item.label}
                   icon={item.label}
                   />
                </div>
              ))}
            </div>
        </div>
    )

    return (
    <Modal
    title="Termék feltöltése"
    isOpen={uploadModal.isOpen}
    onClose={uploadModal.onClose}
    onSubmit={uploadModal.onClose}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    />
    )
}

export default UploadModal;
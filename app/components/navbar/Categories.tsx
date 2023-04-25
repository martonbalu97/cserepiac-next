'use client'

import Container from "../Container";
import CategoryBox from "./CategoryBox";
import {TbHome} from 'react-icons/tb'
import {GiClothes,GiCarWheel} from 'react-icons/gi'
import {GoDeviceDesktop} from 'react-icons/go'
import {MdOutlineSportsBaseball} from 'react-icons/md'
import {FaCarrot,FaGamepad} from 'react-icons/fa'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import MenuItem from "./MenuItem";
import {useState,useCallback} from 'react'

export const categories = [
    {
        label:"Otthon",
        icon:TbHome,
        description:"Otthoni, háztartási termékek"
    },
    {
        label:"Ruházat",
        icon:GiClothes,
        description:"Ruhák minden mennyiségben!"
    },
    {
        label:"Műszaki cikk",
        icon:GoDeviceDesktop,
        description:"Műszaki cikkek"
    },
    {
        label:"Sport",
        icon:MdOutlineSportsBaseball,
        description:"Sport termékek/kiegészítők"
    },
    {
        label:"Élelmiszer",
        icon:FaCarrot,
        description:"Élelmiszerek"
    },
    {
        label:"Játék",
        icon:FaGamepad,
        description:"Játékok"
    },
    {
        label:"Autó alkatrészek",
        icon:GiCarWheel,
        description:"Autó alkatrészek"
    },
]

export const subCategs = [
    {
        category:'Sport',
        subcategory:'Focilabda',
        icon: MdOutlineSportsBaseball
    },
    {
        category:'Sport',
        subcategory:'Háló',
        icon: MdOutlineSportsBaseball
    },
]


const Categories = () => {
    const params =  useSearchParams();
    const category = params?.get('category')
    const pathname = usePathname();

    const  isMainPage = pathname == '/';
    if(!isMainPage){
        return null
    }
    return ( 
        <Container>
            <div
            className="pt-4 flex flex-row items-center justify-center overflow-x-auto"
            >
                {categories.map((item) => (
                    <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category == item.label}
                    icon={item.icon}
                    />
                    
                ))}
    </div>
        </Container>
     );
}
 
export default Categories;
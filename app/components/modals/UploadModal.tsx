'use client'

import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal"
import TypeWriter from "@/app/typewriter/TypeWriter";
import {useEffect,useState} from 'react'

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const [text, setText] = useState("")
    const bodyContent = (
        <div>
            <TypeWriter 
         text={text}
         interKeyStrokeDurationInMs={140}/>
       </div>
     )

    useEffect(() =>{
          setText("Hello Balázs, én foglak végigvezetni a kezdeteken...")
    })
    

    return (
    <Modal
    title="Termék feltöltése"
    isOpen={uploadModal.isOpen}
    onClose={uploadModal.onClose}
    onSubmit={uploadModal.onClose}
    actionLabel="Tovább"
    body={bodyContent}
    />
    )
}

export default UploadModal;
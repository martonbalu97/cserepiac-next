'use client'

import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal"
import TypeWriter from "@/app/typewriter/TypeWriter";

const UploadModal = () => {
    const uploadModal = useUploadModal();

    const bodyContent = (
        <div>
            <TypeWriter 
         text={"Hello Balázs, én foglak végigvezetni a kezdeteken..."}
         interKeyStrokeDurationInMs={160}/>
        </div>
    )
    return ( 
        <Modal
        title="Termék feltöltése"
        isOpen={uploadModal.isOpen}
        onClose={uploadModal.onClose}
        onSubmit={uploadModal.onClose}
        actionLabel="Tovább"
        />
     );
}
 
export default UploadModal;
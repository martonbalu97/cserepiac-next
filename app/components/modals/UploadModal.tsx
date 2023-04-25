'use client'

import Modal from "./Modal";
import useUploadModal from "@/app/hooks/useUploadModal"

const UploadModal = () => {
    const uploadModal = useUploadModal();
    return ( 
        <Modal
        title="Termék feltöltése"
        isOpen={uploadModal.isOpen}
        onClose={uploadModal.onClose}
        onSubmit={uploadModal.onClose}
        actionLabel="Tovább"/>
     );
}
 
export default UploadModal;
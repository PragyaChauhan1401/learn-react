import React from 'react'
import {RiEditCircleLine} from 'react-icons/ri'
import {IoMdTrash} from 'react-icons/io'
import {HiOutlineUserCircle} from 'react-icons/hi'
import { deleteDoc,doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import AddAndUpdatecontact from './AddAndUpdatecontact'
import {useDisclosure} from '../hooks/useDisclosure'

const Contactcard = ({contact}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const deleteDocument = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts',id));
            toast.success("Contact deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div key={contact.id}
             className='flex items-center justify-between rounded-lg bg-yellow p-2'
             >
               <div className='flex gap-1'> 
                 <HiOutlineUserCircle className='text-4xl text-orange'/>
                 <div>
                   <h2 className='font-medium'>{contact.name}</h2>
                   <p className='text-sm'>{contact.email}</p>
                 </div>
               </div>
               <div className='flex text-3xl '>
                 <RiEditCircleLine onClick={onOpen}
                 className='cursor-pointer'/>
                 <IoMdTrash onClick={() => deleteDocument(contact.id)} className='text-orange cursor-pointer'/>
               </div>
     </div>
     <AddAndUpdatecontact
       contact={contact}
      isUpdate 
      isOpen={isOpen}
       onClose={onClose} />
     </>
  )
}

export default Contactcard

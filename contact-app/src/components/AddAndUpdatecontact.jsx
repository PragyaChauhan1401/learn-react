import React from 'react'
import Model from './Model'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {addDoc, collection, doc,updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});
export const AddAndUpdatecontact = ({isUpdate,contact,isOpen,onClose}) => {
    const addContact = async(contact) => {
        try{
            const contactRef = collection(db, 'contacts');
            await addDoc(contactRef, contact);
            toast.success("Contact added successfully");
           } catch(error){
            console.log(error);
        };
        
    }
     const updateContact = async(contact,id) => {
        try{
            const contactRef = doc(db, 'contacts',id);
            await updateDoc(contactRef, contact);
            toast.success("Contact updated successfully");
            
        } catch(error){
            console.log(error);
        };
        
    }
  return (
    <>
   <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={isUpdate ?
            {name: contact.name, email:contact.email}:
            {name: '', email: ''}
        }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? 
            updateContact(values,contact.id):
            addContact(values)
            onClose();
          }}>
        <Form className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
            <Field name='name' className='border h-10' /> 
            <div className='text-red-500 text-xs'>
                <ErrorMessage name='name'/>
            </div>
            </div>
             <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
            <Field  name='email' className='border h-10' /> 
            <div className='text-red-500 text-xs'>
                <ErrorMessage name='email'/>
            </div>
            </div>
            <button className='bg-orange px-3 py-1.5 border self-end '> {isUpdate ? 'Update' : 'Add'} Contact </button>
        </Form>
       
      </Formik>
      </Model>
      
    </div>
    </>
  )
}
export default AddAndUpdatecontact;

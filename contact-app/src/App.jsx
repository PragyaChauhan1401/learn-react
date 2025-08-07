import './App.css'
import Navbar from './components/Navbar'
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import Contactcard from './components/Contactcard'
import {AddAndUpdatecontact} from './components/AddAndUpdatecontact'
import {useDisclosure} from './hooks/useDisclosure'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    const getContacts = async() => {
      try{
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
      setContacts(contactsLists);
      return contactsLists;
        });
    }
    catch (error) {
      console.error("Error fetching contacts: ", error);

    }
    }
    getContacts();
  },[]);
  const filterContacts = (e) => {
    const value = e.target.value;
     const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
           const filteredContacts = contactsLists.filter((contact) => 
          contact.name.toLowerCase().includes(value.toLowerCase()));
           setContacts(filteredContacts);
           return filteredContacts;
 }
        )
  }
  return (
    <>
    <div className='mx-auto max-w-[370px] px-4'>
     <Navbar/>
      <div className='flex gap-2'>
         <div className='relative flex items-center flex-grow'>
        <FiSearch className='text-3xl absolute text-white pl-1' />
        <input onChange={filterContacts} type="text" className='border bg-transparent border-white 
        rounded-md h-10 flex-grow text-white pl-9' />
      </div>
      
        <AiFillPlusCircle onClick={onOpen} className='text-5xl  cursor-pointer text-white ' />
    
      </div>
      <div  className='mt-4 gap-2 flex-col flex'>
        {contacts.map((contact) => (
         <Contactcard key={contact.id} contact={contact}/>
        ))}
      </div>
      <AddAndUpdatecontact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer position='bottom-center'/>
    </div>
     </>
  )
}

export default App;
 
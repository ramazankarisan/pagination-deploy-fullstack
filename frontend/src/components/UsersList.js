import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import User from './User';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [page ,setPage] = useState(1);
    
   
    const getUsers = async(page =1 ,limit = 300)=>{
    const result = await axios.get(`http://localhost:5000/api/user/paginate?page=${page}&limit=${limit}`);
    if(result){
      setUsers(result.data.allUsers)
    }
    }
    useEffect(()=>{
      console.log(' start');
      getUsers();
    },[]);

    useEffect(()=>{
      getUsers(page);
    },[page]);

    // to go to next page 
   const next = ()=>{
     const nextPage = page +1;
     setPage(nextPage) 
   }

   // to go to previous page
   const previous = ()=>{
     const previousPage = page -1 
     if(previousPage < 1){
       setPage(1)
     }
     else{
       setPage(previousPage)
     }
  }
  return (
    <>
    <div className='row container'>
      <div className='col-3'>
         <p>{ users.length} users found</p>
         <p> <b> page : {page} </b></p>
      </div>
      <div className='col'>
         <button onClick={previous} className='btn btn-info' >Previous</button> &nbsp;&nbsp;
         <button onClick={next} className='btn btn-info' disabled={users.length < 1} >next</button>
      </div>
    </div>
    <div className='flex-grid'>
       {
         users.length > 0 && users.map((item , index)=>{
           return (
             <div className='col' key = {index}>
               <User user={item}   />
            </div>
           )
         })
       }
    </div>
    </>

  )
}

export default UsersList
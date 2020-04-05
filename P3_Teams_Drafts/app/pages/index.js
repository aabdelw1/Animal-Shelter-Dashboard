import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Home from '../components/Home'
import { useRouter } from 'next/router'

const home = () => {
  const [loggedin, setLoggedin] = useState(null);
  const router = useRouter();
  
  useEffect (() => {
    if (localStorage.getItem('isLoggedin')) {
      setLoggedin(true);
    }else {
      setLoggedin(false);
    }
  });

  if(loggedin){
    router.push('/animalDashboard');
  }else{
    return (  
      <div>
        <Head>
          <title>Ingie's Animal Shelter</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Home />
      </div>
  ) 
  }
}

export default home

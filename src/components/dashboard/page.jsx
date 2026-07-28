"use client"

import { useNotify } from '@/hooks/useNotify'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
  const {notice} = useNotify();  
  const route = useRouter();
  const handleClick = async () => {
    try {
      const res = await api.get("https://api.magnateshop.uz/api/v1/auth/sessions", {_isPublic: false}) 
      console.log(res);
         
    }catch(error) {
      notice("Something went wrong, login again or reload the page!", "error")
      route.replace("/login")
    }
  }
  return (
    <div>Dashboard
      <button onClick={() => handleClick()}>get</button>
    </div>
  )
}

export default Dashboard
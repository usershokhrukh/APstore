"use client"

import { StatusContext } from '@/context/StatusContext'
import React, { useState } from 'react'

const StatusGuard = ({children}) => {
    const [status, setStatus] = useState({
      text: "",
      type: null,
    })
  return (
    <>
    <StatusContext.Provider value={[status, setStatus]}>
      {children}
    </StatusContext.Provider>
    </>
  )
}

export default StatusGuard
"use client";

import GlobalModal from "@/components/modal/GlobalModal";
import {ModalContext} from "@/context/ModalContext";
import React, {useState} from "react";

const ModalGuard = ({children}) => {
  const [comp, setComp] = useState(null);
  const [close, setClose] = useState(false);
  return (
    <ModalContext.Provider value={{setComp, setClose}}>
      {children}
      {close ? <GlobalModal comp={comp} setClose={setClose} /> : null}
    </ModalContext.Provider>
  );
};

export default ModalGuard;

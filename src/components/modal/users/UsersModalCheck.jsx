"use client"
import NotFound from "@/components/not-found/NotFound";
import {useSearchParams} from "next/navigation";
import React from "react";
import UsersViewModal from "./view/UsersViewModal";

const UsersModalCheck = () => {
  const searchParams = useSearchParams();
  const isView = searchParams.get("user_view");
  
  if(isView) {
    return <UsersViewModal/>
  }else if(searchParams.size == 0) {
    return <>Loading...</>
  }
  return <NotFound text={"Oops! Search not found"} status={404}/>
};

export default UsersModalCheck;

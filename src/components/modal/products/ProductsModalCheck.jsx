"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import NotFound from "@/components/not-found/NotFound"; 

const ProductsModalCheck = () => {
  const searchParams = useSearchParams();

  const isView = searchParams.get("product_view");
  const isEdit = searchParams.get("product_edit");
  const isCreate = searchParams.get("product_create");

  if (isView) {
    return <div>Products View Modal (ID: {isView})</div>; 
  }

  if (isEdit) {
    return <div>Products Edit Modal (ID: {isEdit})</div>;
  }

  if (isCreate) {
    return <div>Products Create Modal</div>;
  }

  if (searchParams.size === 0) {
    return <>Loading...</>;
  }

  return <NotFound text={"Oops! Search parameters not found"} status={404} />;
};

export default ProductsModalCheck;
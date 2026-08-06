"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import NotFound from "@/components/not-found/NotFound";
import ProductsCreateModal from "./create/ProductsCreateModal";
import ProductsEditModal from "./edit/ProductsEditModal";
import ProductsViewModal from "./view/ProductsViewModal";

const ProductsModalCheck = () => {
  const searchParams = useSearchParams();

  const isView = searchParams.get("product_view");
  const isEdit = searchParams.get("product_edit");
  const isCreate = searchParams.get("product_create");

  const handleClose = () => {
    window.location.href = window.location.pathname;
  };

  if (isCreate === "true") {
    return <ProductsCreateModal onClose={handleClose} />;
  }

  if (isEdit) {
    return <ProductsEditModal id={isEdit} onClose={handleClose} />;
  }

  if (isView) {
    return <ProductsViewModal id={isView} onClose={handleClose} />;
  }

  if (searchParams.size === 0) {
    return <>Loading...</>;
  }

  return <NotFound text={"Oops! Search parameters not found"} status={404} />;
};

export default ProductsModalCheck;

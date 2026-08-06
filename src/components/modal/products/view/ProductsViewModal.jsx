"use client";
import React from "react";
import { useGetSingleProduct } from "@/hooks/products/GetProducts";
import "@/app/products/products.modules.scss";
const ProductsViewModal = ({ id }) => {
  const { data: product, isLoading, isError, error } = useGetSingleProduct(id);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="product__view-modal">
      <div className="product__view-div">
        <div className="product__view-block">
          <img
            className="product__view-img"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="product__view-word">
          <p className="product__view-p" title={product.id}>
            <span className="product__view-span">Id:</span>
            {product?.id.length > 1
              ? `${product.id.slice(0, 1)}.......`
              : product.id}
          </p>
          <p className="product__view-p">
            <span className="product__view-span">Name:</span> {product?.title}
          </p>
          <p className="product__view-p">
            <span className="product__view-span">Category:</span>
            {product?.category?.name}
          </p>
          <p className="product__view-p">
            <span className="product__view-span">Price:</span>${product?.price}
          </p>
          <p className="product__view-p">
            <span className="product__view-span">Stock:</span>
            {product?.stock} ta
          </p>
          <p className="product__view-p">
            <span className="product__view-span">Description:</span>
            {product?.description.length > 30
              ? `${product.description.slice(0, 30)}.......`
              : product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsViewModal;

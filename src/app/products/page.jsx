"use client";
import React, { useEffect } from "react";
import "./products.modules.scss";
import { useGetProducts } from "@/hooks/products/GetProducts";
import { useStatus } from "@/hooks/useStatus";
const page = () => {
  const { processStatus } = useStatus();
  const { data: products, isLoading, isError, error } = useGetProducts();
  useEffect(() => {
    if (isLoading) {
      processStatus("Loading...", "pending");
    } else if (isError) {
      processStatus(error?.message, "reject");
    } else if (products && products?.length > 0) {
      processStatus("Success!", "fulfilled");
    }
  }, [isLoading, isError, products?.length]);

  return (
    <div className="product">
      <table className="product__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product,index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td title={product.description}>
                  {product.description?.length > 50
                    ? `${product.description.slice(0, 50)}...`
                    : product.description}
                </td>
                <td>{product.category?.name || "Kategoriyasiz"}</td>
                <td>${product.price}</td>
                <td>{product.stock} ta</td>
                <td className="product__block">
                  <button className="product__edit" onClick={() => {}}>
                    Edit
                  </button>
                  <button className="product__delete" onClick={() => {}}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Mahsulotlar topilmadi</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;

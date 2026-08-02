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
            products.map((product, index) => (
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
                    <span className="product__span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                      </svg>
                    </span>
                  </button>
                  <button className="product__delete" onClick={() => {}}>
                    <span className="product__span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                      </svg>
                    </span>
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

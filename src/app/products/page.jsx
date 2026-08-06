"use client";
import React, { useEffect, useState, useContext } from "react";
import "./products.modules.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ModalContext } from "@/context/ModalContext";
import ProductsModalCheck from "@/components/modal/products/ProductsModalCheck";
import {
  useGetProducts,
  useDeleteProducts,
} from "@/hooks/products/GetProducts";
import { useStatus } from "@/hooks/useStatus";
const page = () => {
  const { processStatus } = useStatus();
  const [page, setPage] = useState(1);
  const { data: products, isLoading, isError, error } = useGetProducts(page);
  const { mutate: deleteProduct } = useDeleteProducts();
  const [value, setValue] = useState("");
  const { setComp, setClose } = useContext(ModalContext);
  const searchParams = useSearchParams();
  const [key, setKey] = useState(null);
  const openModal = (paramKey, id) => {
    if (!paramKey || !id) {
      return processStatus("Something went wrong!", "reject");
    }
    setKey(paramKey);
    setComp(<ProductsModalCheck />);
  };
  useEffect(() => {
    if (searchParams.size > 0 && key) {
      if (searchParams.get(key)) {
        setClose(true);
      } else {
        processStatus("Could not get data!", "reject");
      }
      setKey(null);
    }
  }, [searchParams, key, setClose]);
  useEffect(() => {
    if (isLoading) {
      processStatus("Loading...", "pending");
    } else if (isError) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Avtorizatsiyadan o'tilmagan (401)";

      processStatus(errorMessage, "reject");
    } else if (products && products?.items?.length > 0) {
      processStatus("Success!", "fulfilled");
    }
  }, [isLoading, isError, error, products?.items?.length]);
  console.log(page);
  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        processStatus("Success!", "fulfilled");
      },
      onError: (err) => {
        processStatus(err?.message || "O'chirishda xatolik bo'ldi", "reject");
      },
    });
  };
  return (
    <div className="product">
      <div className="product__header">
        <div className="search__container">
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="search-input"
          />

          {value ? (
            <span
              className="search-icon clear-icon"
              onClick={() => setValue("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.7782 4H18.9411L14.4519 8.37097C13.7983 9.00497 12.9175 9.36038 11.9998 9.36038C11.0822 9.36038 10.2014 9.00497 9.54783 8.37097L5.06209 4H2.22266L8.12927 9.75399C10.269 11.8366 13.7357 11.8366 15.8739 9.75399L21.7782 4ZM2.22266 20H5.05095L9.55942 15.6151C10.2105 14.9842 11.088 14.6305 12.0021 14.6305C12.9163 14.6305 13.7938 14.9842 14.4449 15.6151L18.9518 20H21.7782L15.8581 14.2388C13.7264 12.1663 10.2729 12.1663 8.14279 14.2388L2.22266 20Z"></path>
              </svg>
            </span>
          ) : (
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
              </svg>
            </span>
          )}
        </div>
        <Link
          href={{
            pathname: "/products",
            query: { product_create: "true" },
          }}
          scroll={false}
          className="product__add"
          onClick={() => openModal("product_create", "true")}
        >
          Add Product
        </Link>
      </div>
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
          {products?.items.length > 0 ? (
            products.items.map((product, index) => (
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
                  <Link
                    href={{
                      pathname: "/products",
                      query: { product_edit: product.id },
                    }}
                    scroll={false}
                    className="product__edit"
                    onClick={() => openModal("product_edit", product.id)}
                  >
                    <span className="product__span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href={{
                      pathname: `/products`,
                      query: { product_view: product.id },
                    }}
                    scroll={false}
                    className="product__view"
                    onClick={() => openModal("product_view", product.id)}
                  >
                    <span className="product__span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                      </svg>
                    </span>
                  </Link>
                  <button
                    className="product__delete"
                    onClick={() => handleDelete(product.id)}
                  >
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
      <div className="product__pagination">
        <button
          className="product__pagination__btn"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!products?.meta?.hasPrevPage}
        >
          Previous
        </button>
        <span className="product__pagination__info">
          {products?.meta?.page || 1} / {products?.meta?.totalPages || 1}
        </span>
        <button
          className="product__pagination__btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!products?.meta?.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default page;

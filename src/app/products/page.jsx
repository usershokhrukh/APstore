"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import "./products.modules.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ModalContext } from "@/context/ModalContext";
import ProductsModalCheck from "@/components/modal/products/ProductsModalCheck";
import ProductsDeleteModal from "@/components/modal/products/delete/ProductsDeleteModal";
import {
  useGetProducts,
  useDeleteProducts,
} from "@/hooks/products/GetProducts";
import { useStatus } from "@/hooks/useStatus";

const Products = () => {
  const { processStatus } = useStatus();

  const [limit, setLimit] = useState({
    page: 1,
    limit: 4,
  });
  const [openSelect, setOpenSelect] = useState(false);
  const [value, setValue] = useState("");

  const queryString = `?page=${limit.page}&limit=${limit.limit}`;
  const { data: products, isLoading, isError, error } = useGetProducts(queryString);
  const { mutate: deleteProduct } = useDeleteProducts();

  const { setComp, setClose } = useContext(ModalContext);
  const searchParams = useSearchParams();
  const [key, setKey] = useState(null);

  const meta = products?.meta || null;

  // Sahifa raqamlarini dynamic hisoblash (useEffect o'rniga useMemo)
  const metaList = useMemo(() => {
    if (!meta?.totalPages) return [];
    const total = meta.totalPages;
    const current = limit.page;
    
    // Maksimal 3 ta tugma ko'rsatish mantig'i
    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [meta?.totalPages, limit.page]);

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
  }, [searchParams, key, setClose, processStatus]);

  // Loading va Error statuslarni nazorat qilish
  useEffect(() => {
    if (isLoading) {
      processStatus("Loading...", "pending");
    } else if (isError) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Avtorizatsiyadan o'tilmagan (401)";
      processStatus(errorMessage, "reject");
    }
  }, [isLoading, isError, error, processStatus]);

  const handleDeleteClick = (id) => {
    setClose(true);
    setComp(
      <ProductsDeleteModal
        onClose={() => setClose(false)}
        onConfirm={() => {
          deleteProduct(id, {
            onSuccess: () => {
              processStatus("Muvaffaqiyatli o'chirildi!", "fulfilled");
              setClose(false);
            },
            onError: (err) => {
              processStatus(
                err?.message || "O'chirishda xatolik bo'ldi",
                "reject"
              );
              setClose(false);
            },
          });
        }}
      />
    );
  };

  const handleLimit = (newLimit) => {
    setLimit({
      limit: newLimit,
      page: 1,
    });
    setOpenSelect(false);
  };

  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setLimit((prev) => ({
        ...prev,
        page: Number(prev.page) + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (meta?.hasPrevPage) {
      setLimit((prev) => ({
        ...prev,
        page: Number(prev.page) - 1,
      }));
    }
  };

  const handlePageClick = (pageNum) => {
    setLimit((prev) => ({
      ...prev,
      page: Number(pageNum),
    }));
  };

  // Qidiruv bo'yicha filter qilish
  const filteredProducts = useMemo(() => {
    if (!products?.items) return [];
    return products.items.filter((product) =>
      product.title?.toLowerCase().includes(value.toLowerCase())
    );
  }, [products?.items, value]);

  return (
    <div className="product">
      <div className="product__header">
        <div className="product__header-left">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.7782 4H18.9411L14.4519 8.37097C13.7983 9.00497 12.9175 9.36038 11.9998 9.36038C11.0822 9.36038 10.2014 9.00497 9.54783 8.37097L5.06209 4H2.22266L8.12927 9.75399C10.269 11.8366 13.7357 11.8366 15.8739 9.75399L21.7782 4ZM2.22266 20H5.05095L9.55942 15.6151C10.2105 14.9842 11.088 14.6305 12.0021 14.6305C12.9163 14.6305 13.7938 14.9842 14.4449 15.6151L18.9518 20H21.7782L15.8581 14.2388C13.7264 12.1663 10.2729 12.1663 8.14279 14.2388L2.22266 20Z"></path>
                </svg>
              </span>
            ) : (
              <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
              </span>
            )}
          </div>

          <div className="table__t-select-box">
            <span
              onClick={() => setOpenSelect(!openSelect)}
              className="table__t-select"
            >
              <span className="table__t-select-number">
                {limit?.limit === meta?.total ? "all" : limit?.limit}
              </span>
              <span className="table__t-select-span">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                </svg>
              </span>
            </span>
            <div className={`table__t-option-box ${openSelect ? "table__show-select" : ""}`}>
              <span onClick={() => handleLimit(2)} className="table__t-option">2</span>
              <span onClick={() => handleLimit(4)} className="table__t-option">4</span>
              <span onClick={() => handleLimit(8)} className="table__t-option">8</span>
              <span onClick={() => handleLimit(16)} className="table__t-option">16</span>
              <span onClick={() => handleLimit(meta?.total || 100)} className="table__t-option">all</span>
            </div>
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

        <div className="table__t-pagination">
          <button
            className={`table__tpag-left-right table__tpag-left ${
              meta?.hasPrevPage ? "table__tpag-media" : "table__tpag-block"
            }`}
            onClick={handlePrevPage}
            disabled={!meta?.hasPrevPage}
          >
            <span className="table__tpag-btnspan">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z"></path>
              </svg>
            </span>
            Prev
          </button>

          <div className="table__tpag-center">
            {metaList.map((item) => (
              <span
                key={item}
                onClick={() => handlePageClick(item)}
                className={`table__t-pag-nbers ${
                  limit.page === item ? "table__t-pag-active" : ""
                }`}
              >
                {item}
              </span>
            ))}

            {meta?.totalPages > metaList[metaList.length - 1] && (
              <>
                <span className="table__t-pag-nbers-dot">...</span>
                <span
                  onClick={() => handlePageClick(meta.totalPages)}
                  className={`table__t-pag-nbers ${
                    limit.page === meta.totalPages ? "table__t-pag-active" : ""
                  }`}
                >
                  {meta.totalPages}
                </span>
              </>
            )}
          </div>

          <button
            className={`table__tpag-left-right table__tpag-right ${
              meta?.hasNextPage ? "table__tpag-media" : "table__tpag-block"
            }`}
            onClick={handleNextPage}
            disabled={!meta?.hasNextPage}
          >
            Next
            <span className="table__tpag-btnspan">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
              </svg>
            </span>
          </button>
        </div>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{(limit.page - 1) * limit.limit + index + 1}</td>
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                      </svg>
                    </span>
                  </Link>
                  <button
                    className="product__delete"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    <span className="product__span">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                Mahsulotlar topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
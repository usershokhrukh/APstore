"use client";
import React, { useEffect, useState, useContext } from "react";
import "./products.modules.scss";
import "../../components/users/table.modules.scss";
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

  const [limit, setLimit] = useState({
    page: 1,
    limit: 4,
  });
  const [search, setSearch] = useState({
    username: "",
    limit: 4,
    page: 1,
  });
  const queryString = `?page=${limit?.page}&limit=${limit?.limit || 12}`;

  const { data, isLoading, isError, error } = useGetProducts(queryString);
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
    } else if (data && data?.items?.length > 0) {
      processStatus("Success!", "fulfilled");
    }
  }, [isLoading, isError, error, data?.items?.length]);
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

  const [openSelect, setOpenSelect] = useState(false);

  const handleLimit = (i) => {
    setLimit({
      ...limit,
      limit: i,
      page: 1,
    });
    setSearch({
      ...search,
      username: "",
      limit: i,
    });
    setOpenSelect(false);
  };

  const handleSearch = (e) => {
    setOpenSelect(false);
    if (!e.target.value.trim()) {
      setLimit({
        ...limit,
        limit: search?.limit,
        page: search?.page,
      });
    } else {
      const total = data?.meta?.total || limit?.limit;
      setLimit({
        ...limit,
        limit: total,
        page: 1,
      });
    }
    setSearch({
      ...search,
      username: e.target.value.trim(),
    });
  };

  useEffect(() => {
    if (!search?.username?.length) {
      setSearch({
        ...search,
        limit: limit?.limit,
        page: limit?.page,
      });
    }
  }, [limit]);
  const [metaList, setMetaList] = useState([]);

  const [meta, setMeta] = useState(null);
  useEffect(() => {
    if (data?.meta) {
      setMeta(data?.meta);
    } else {
      setMeta(null);
      setMetaList([]);
    }
  }, [data]);

  useEffect(() => {
    if (meta?.totalPages) {
      if (meta?.totalPages >= 3) {
        setMetaList([1, 2, 3]);
      } else if (meta?.totalPages == 2) {
        setMetaList([1, 2]);
      } else if (meta?.totalPages == 1) {
        setMetaList([1]);
      }
    }
  }, [meta]);
  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setLimit({
        ...limit,
        page: Number(limit?.page) + 1,
      });
    }
  };
  const handlePrevPage = () => {
    if (meta?.hasPrevPage) {
      setLimit({
        ...limit,
        page: Number(limit?.page) - 1,
      });
    }
  };

  const handlePage = (e) => {
    const n = e.target?.id || limit?.page;
    setLimit({
      ...limit,
      page: n,
    });
  };
  return (
    <div className="product">
      <div className="product__header">
        <div className="table__top">
          <div className="table__t-left">
            <input
              value={search?.username}
              onChange={handleSearch}
              placeholder="Search username"
              type="text"
              className="table__t-search"
            />
            <div className="table__t-select-box">
              <span
                onClick={() => setOpenSelect(!openSelect)}
                className="table__t-select"
              >
                <span className="table__t-select-number">
                  {limit?.limit == data?.meta?.total ? "all" : limit?.limit}
                </span>

                <span className="table__t-select-span">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                  </svg>
                </span>
              </span>
              <div
                className={`table__t-option-box ${openSelect ? "table__show-select" : null}`}
              >
                <span
                  onClick={() => handleLimit(2)}
                  className="table__t-option"
                >
                  2
                </span>
                <span
                  onClick={() => handleLimit(4)}
                  className="table__t-option"
                >
                  4
                </span>
                <span
                  onClick={() => handleLimit(8)}
                  className="table__t-option"
                >
                  8
                </span>
                <span
                  onClick={() => handleLimit(16)}
                  className="table__t-option"
                >
                  16
                </span>
                <span
                  onClick={() => {
                    setLimit({
                      ...limit,
                      limit: data?.meta?.total,
                      page: 1,
                    });
                    setOpenSelect(false);
                  }}
                  className="table__t-option"
                >
                  all
                </span>
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
              className={`table__tpag-left-right table__tpag-left ${meta?.hasPrevPage ? "table__tpag-media" : "table__tpag-block"}`}
              onClick={handlePrevPage}
            >
              <span className="table__tpag-btnspan">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z"></path>
                </svg>
              </span>
              Prev
            </button>
            <div className="table__tpag-center">
              {metaList?.map((item) => (
                <span
                  key={item}
                  onClick={handlePage}
                  id={`${item}`}
                  className={`table__t-pag-nbers ${meta?.page == item ? "table__t-pag-active" : ""}`}
                >
                  {item || "None"}
                </span>
              ))}
              {meta?.totalPages > 3 ? (
                <>
                  {meta?.page > 3 && meta?.page != meta?.totalPages ? (
                    <>
                      {meta?.page - 1 != 3 ? (
                        <span className="table__t-pag-nbers-dot">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                          </svg>
                        </span>
                      ) : null}
                      <span
                        id={`${meta?.page}`}
                        onClick={handlePage}
                        className={`table__t-pag-nbers table__t-pag-active`}
                      >
                        {meta?.page}
                      </span>
                    </>
                  ) : null}

                  {meta?.page + 1 != meta?.totalPages ? (
                    <span className="table__t-pag-nbers-dot">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                      </svg>
                    </span>
                  ) : null}

                  <span
                    onClick={handlePage}
                    id={`${meta?.totalPages}`}
                    className={`table__t-pag-nbers ${meta?.page == meta?.totalPages ? "table__t-pag-active" : ""}`}
                  >
                    {meta?.totalPages || "None"}
                  </span>
                </>
              ) : null}
            </div>
            <button
              className={`table__tpag-left-right table__tpag-right ${meta?.hasNextPage ? "table__tpag-media" : "table__tpag-block"}`}
              onClick={handleNextPage}
            >
              Next
              <span className="table__tpag-btnspan">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
                </svg>
              </span>
            </button>
          </div>
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
          {data?.items.length > 0 ? (
            data.items.map((product, index) => {
              if (
                product.title
                  .toLowerCase()
                  .includes(search?.username.toLowerCase())
              ) {
                return (
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
                );
              }
            })
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

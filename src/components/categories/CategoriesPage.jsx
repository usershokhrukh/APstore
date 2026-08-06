"use client";

import {useGetCategories} from "@/hooks/categories/GetCategories";
import React, {useEffect, useState} from "react";
import "./categories.modules.scss";
import CategoriesLoading from "./CategoriesLoading";
import {useNotify} from "@/hooks/useNotify";
import NotFound from "../not-found/NotFound";

const CategoriesPage = () => {
  const {data, error, isPending} = useGetCategories();
  const {notice} = useNotify();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (error?.message) {
      notice(
        `Could not get categories, please try later!`,
        "error",
        3000,
        false,
      );
    } else if (!data && !isPending) {
      notice(
        `Could not get categories, please try later!`,
        "error",
        3000,
        false,
      );
    }
  }, [data, error, isPending]);
  return (
    <div className="categories">
      <div className="categories__top">
        <h2 className="categories__title">Categories</h2>
      </div>
      <div className="categories__top-form">
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
          placeholder="Search name"
          className="categories__search-input"
          type="text"
        />
        {/* <button className="categories__add-button">Add category</button> */}
      </div>

      <div className="categories__cards">
        {data?.length ? (
          data?.map(
            ({
              name,
              id,
              slug,
              createdAt,
              updatedAt,
              description,
              image,
              productsCount,
            }) => {
              if (name?.toLowerCase()?.includes(`${search?.toLowerCase()}`)) {
                return (
                  <div className="categories__items">
                    <img
                      width={100}
                      height={100}
                      className="categories__items-img"
                      src={image}
                      alt="404"
                    />
                    <div className="categories__items-bottom">
                      <span className="categories__items-bottom-span-top">
                        <p className="categories__items-title">{name}</p>
                        <p className="categories__items-subtitle">{slug}</p>
                      </span>
                      <p className="categories__items-desc">{description}</p>
                      <p className="categories__items-procount">
                        <span className="categories__items-procount-span">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311L4.5 7.65311ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97065L11 12.5765V17.625H13V12.5765L17.501 9.97066L16.499 8.2398L12 10.8445L7.50104 8.2398L6.49896 9.97065Z"></path>
                          </svg>
                        </span>
                        {productsCount}
                      </p>
                      <div className="categories__items-bottom-table">
                        <span className="categories__items-btable-span">
                          created at:{" "}
                          <span className="categories__items-btable-text">
                            {createdAt}
                          </span>
                        </span>
                        <span className="categories__items-btable-span">
                          updated at:{" "}
                          <span className="categories__items-btable-text">
                            {updatedAt}
                          </span>
                        </span>
                      </div>
                      <div className="categories__items-bottom-buttons">
                        {/* <button className="categories__button-edit-view categories__button-edit">
                          <span className="categories__button-editview-span">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                            </svg>
                          </span>
                        </button> */}
                        {/* <button className="categories__button-edit-view categories__button-view">
                          <span className="categories__button-editview-span">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                            </svg>
                          </span>
                        </button> */}
                      </div>
                    </div>
                  </div>
                );
              }
            },
          )
        ) : isPending ? (
          <CategoriesLoading />
        ) : !data && !isPending ? (
          <NotFound text={"There is nothing to do"} status={null} />
        ) : null}
      </div>
    </div>
  );
};

export default CategoriesPage;

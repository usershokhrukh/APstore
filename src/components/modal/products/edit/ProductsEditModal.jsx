"use client";
import React, { useState, useEffect } from "react";
import {
  useGetSingleProduct,
  useUpdateProduct,
} from "@/hooks/products/GetProducts";
import "@/app/products/products.modules.scss";

const ProductsEditModal = ({ id, onClose }) => {
  const { data: product, isLoading } = useGetSingleProduct(id);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    categoryId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        title: product?.title || "",
        price: product?.price || "",
        stock: product?.stock || "",
        description: product?.description || "",
        image: product?.image || "",
        categoryId: product?.category?.id || product?.categoryId || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.description.trim().length < 10) {
      setErrorMessage(
        "Description kamida 10 ta belgidan iborat bo'lishi kerak!",
      );
      return;
    }

    if (!formData.categoryId) {
      setErrorMessage("Category ID bo'sh bo'lishi mumkin emas!");
      return;
    }

    const payload = {
      title: String(formData.title).trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: String(formData.description).trim(),
      categoryId: formData.categoryId,
    };

    if (formData.image && formData.image.startsWith("http")) {
      payload.image = formData.image.trim();
    }

    updateProduct(
      { id, ...payload },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
        onError: (err) => {
          const messages = err?.response?.data?.message;
          if (Array.isArray(messages)) {
            setErrorMessage(messages.join(", "));
          } else {
            setErrorMessage(messages || "Xatolik yuz berdi!");
          }
        },
      },
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product__edit-modal">
      <form className="product__edit-form" onSubmit={handleSubmit}>
        {errorMessage && (
          <div title={errorMessage} style={{ color: "red", fontSize: "13px" }}>
            {errorMessage.length > 50
              ? `${errorMessage.slice(0, 50)}...`
              : errorMessage}
          </div>
        )}

        <input
          className="product__edit-inp"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          minLength={3}
          maxLength={200}
          required
        />

        <input
          className="product__edit-inp"
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min={0.01}
          max={1000000}
          required
        />

        <input
          className="product__edit-inp"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          className="product__edit-inp"
          type="text"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />

        <input
          className="product__edit-inp"
          type="url"
          name="image"
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          className="product__edit-inp"
          name="description"
          value={formData.description}
          onChange={handleChange}
          minLength={10}
          maxLength={5000}
          required
        />

        <div className="product__edit-action">
          <button
            type="button"
            className="product__edit-btn cancel"
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              if (onClose) onClose();
            }}
          >
            Close
          </button>
          <button
            type="submit"
            className="product__edit-btn submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsEditModal;

"use client";
import React, { useState } from "react";
import { useCreateProduct, useGetCategories } from "@/hooks/products/GetProducts";
import "@/app/products/products.modules.scss";
const ProductsCreateModal = ({ onClose }) => {
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategories();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    categoryId: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

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

    createProduct(payload, {
      onSuccess: () => {
        if (onClose) onClose();
      },
      onError: (err) => {
        const messages = err?.response?.data?.message;
        if (Array.isArray(messages)) {
          setErrorMessage(messages.join(", "));
        } else {
          setErrorMessage(
            messages || "Yangi mahsulot qo'shishda xatolik yuz berdi!",
          );
        }
      },
    });
  };

  return (
    <div className="product__create-modal">
      <form className="product__create-form" onSubmit={handleSubmit}>
        {errorMessage && (
          <div style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}>
            {errorMessage}
          </div>
        )}

        <input
          className="product__create-inp"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          minLength={3}
          maxLength={200}
          required
        />

        <input
          className="product__create-inp"
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min={0.01}
          max={1000000}
          required
        />

        <input
          className="product__create-inp"
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <select
          className="product__create-inp"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value=""> Select Category </option>
          {isCategoriesLoading ? (
            <option disabled>Loading...</option>
          ) : (
            categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title || cat.name}
              </option>
            ))
          )}
        </select>

        <input
          className="product__create-inp"
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          className="product__create-inp"
          name="description"
          placeholder="Description (min 10)"
          value={formData.description}
          onChange={handleChange}
          minLength={10}
          maxLength={5000}
          required
        />

        <div className="product__create-action">
          <button
            type="button"
            className="product__create-btn cancel"
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
            className="product__create-btn submit"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsCreateModal;

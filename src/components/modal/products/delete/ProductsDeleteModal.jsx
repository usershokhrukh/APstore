"use client";
import React from "react";

const ProductsDeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="product__modal-overlay">
      <div className="product__modal-card">
        <h3>O'chirishni tasdiqlaysizmi?</h3>
        <p>Ushbu ma'lumotni butunlay o'chirib tashlamoqchimisiz?</p>
        
        <div className="product__modal-actions" style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "flex-end" }}>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-cancel"
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Yo'q
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className="btn-confirm"
            style={{ padding: "8px 16px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Ha
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDeleteModal;
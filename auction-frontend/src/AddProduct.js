import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    startingPrice: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      startingPrice: parseInt(formData.startingPrice),
      currentPrice: parseInt(formData.startingPrice),
    };

    try {
      const res = await fetch("https://vietdaugia-api.onrender.com/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert('Đăng sản phẩm thành công!');
        navigate('/');
      } else {
        alert('Đăng thất bại!');
      }
    } catch (err) {
      console.error('Lỗi khi đăng sản phẩm:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng sản phẩm đấu giá mới</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá khởi điểm</label>
          <input
            type="number"
            className="form-control"
            name="startingPrice"
            required
            value={formData.startingPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Link ảnh</label>
          <input
            type="text"
            className="form-control"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Đăng sản phẩm
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

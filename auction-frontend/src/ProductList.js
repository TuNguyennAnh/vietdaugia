import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://vietdaugia-api.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Lỗi gọi API:', err));
  }, []);

  const getImageUrl = (image) => {
    if (!image) return 'https://vietdaugia-api.onrender.com/uploads/default.jpg';
    if (image.startsWith('data:image')) return image;
    if (image.startsWith('http')) return image;
    if (image.startsWith('/uploads/')) {
      return `https://vietdaugia-api.onrender.com${image}`;
    }
    return 'https://vietdaugia-api.onrender.com/uploads/default.jpg';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Sản phẩm đấu giá</h1>
      <Link to="/add-product" className="btn btn-success mb-3">
        + Đăng sản phẩm mới
      </Link>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={getImageUrl(product.image)}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://vietdaugia-api.onrender.com/uploads/default.jpg';
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Giá khởi điểm: {product.startingPrice.toLocaleString()}đ<br />
                  Giá hiện tại: {product.currentPrice.toLocaleString()}đ
                </p>
                <Link to={`/product/${product._id}`} className="btn btn-primary mt-auto">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

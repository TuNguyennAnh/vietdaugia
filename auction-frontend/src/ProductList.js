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

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Sản phẩm đấu giá</h1>
      <Link to="/add-product" className="btn btn-success mb-3">
  + Đăng sản phẩm mới
</Link>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Giá khởi điểm: {product.startingPrice.toLocaleString()}đ<br />
                  Giá hiện tại: {product.currentPrice.toLocaleString()}đ
                </p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
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

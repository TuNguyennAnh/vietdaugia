import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bid, setBid] = useState('');

  useEffect(() => {
    fetch(`https://vietdaugia-api.onrender.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Lỗi gọi API:', err));
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    const bidAmount = parseInt(bid);

    if (isNaN(bidAmount)) {
      alert('Vui lòng nhập số hợp lệ!');
      return;
    }

    try {
      const res = await fetch(`https://vietdaugia-api.onrender.com/products/${id}/bid`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bid: bidAmount }),
      });

      if (res.ok) {
        const updated = await res.json();
        alert('Đặt giá thành công!');
        setProduct(updated.product);
        setBid('');
      } else {
        const err = await res.text();
        alert('Lỗi: ' + err);
      }
    } catch (err) {
      alert('Lỗi khi đặt giá: ' + err.message);
    }
  };

  if (!product) return <div className="container mt-5">Đang tải chi tiết sản phẩm...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-link mb-3">← Quay về danh sách</Link>
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text">
                <strong>Giá khởi điểm:</strong> {product.startingPrice.toLocaleString()}đ<br />
                <strong>Giá hiện tại:</strong> {product.currentPrice.toLocaleString()}đ
              </p>
              <p className="card-text"><strong>Mô tả:</strong> {product.description}</p>

              <form onSubmit={handleBid} className="mt-4">
                <div className="mb-3">
                  <label className="form-label">Nhập giá muốn đặt</label>
                  <input
                    type="number"
                    className="form-control"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder="VD: 1500000"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning">Đặt giá</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

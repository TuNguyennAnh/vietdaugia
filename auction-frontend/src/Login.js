import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  // Cập nhật input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý khi submit form đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://vietdaugia-api.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage('Đăng nhập thành công!');
        // Lưu token vào localStorage để sử dụng cho các request sau
        localStorage.setItem('access_token', data.access_token);
        // Chuyển hướng về trang chủ hoặc dashboard
        navigate('/');
      } else {
        const error = await res.text();
        setMessage('Lỗi: ' + error);
      }
    } catch (err) {
      setMessage('Lỗi mạng: ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng nhập</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
}

export default Login;

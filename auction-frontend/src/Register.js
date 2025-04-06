import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  // Cập nhật giá trị của các input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý khi form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://vietdaugia-api.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage('Đăng ký thành công!');
        // Sau khi đăng ký thành công, chuyển hướng sang trang đăng nhập
        navigate('/login');
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
      <h2>Đăng ký</h2>
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
          Đăng ký
        </button>
      </form>
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
      </p>
    </div>
  );
}

export default Register;

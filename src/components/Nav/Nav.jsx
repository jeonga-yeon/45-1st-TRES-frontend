import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from './component/CategoryList/CategoryList';
import Search from './component/Search/Search';
import './Nav.scss';

const Nav = () => {
  const TOKEN = localStorage.getItem('TOKEN');

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="nav-user-section">
          <div className="user-section-main">
            <div className="nav-link-box">
              <Link to="/#" className="to-find-shop link">
                매장찾기
              </Link>
              <Link to=".#" className="to-customer-service link">
                고객센터
              </Link>
              {TOKEN ? (
                <div className="loggedin">
                  <span className="welcom-ment">트레스김 님반갑습니다.</span>
                  <button className="user-btn">
                    <img
                      className="user-icon"
                      src="/images/icon/user.svg"
                      alt="유저정보"
                    />
                  </button>
                </div>
              ) : (
                <Link to="/email-verification" className="to-login link">
                  로그인 / 회원가입
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="nav-category-section">
          <div className="category-section-main">
            <Link to="/" className="logo-link">
              <button className="logo-btn">
                <img
                  src="/images/icon/seke120-80.png"
                  alt="로고"
                  className="logo"
                />
              </button>
            </Link>
            <CategoryList />
            <Search />
            <div className="like-cart-box">
              <Link className="link-like" to="/product-list">
                <button className="to-like link-btn">
                  <img
                    src="/images/icon/heart.svg"
                    alt="좋아요"
                    className="like-icon icon"
                  />
                </button>
              </Link>
              <Link className="link-cart" to={TOKEN ? '/cart' : '/'}>
                <button className="to-cart link-btn">
                  <img
                    src="/images/icon/cartbag.svg"
                    alt="장바구니로"
                    className="cart-icon icon"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

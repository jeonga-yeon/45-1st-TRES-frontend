import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductInCart from './componet/ProductInCart';
import ProductRecommendation from './componet/ProductRecommendation';
import { API } from '../../config';
import './Cart.scss';

const DELIVERY_FEE = 3000;

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [recommandList, setRecommandList] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [checkItems, setCheckItems] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const updatedCartList = {};
  cartList.forEach(item => {
    const foodId = item.foodId;
    updatedCartList[foodId] = item;
  });
  const renderCartList = Object.values(updatedCartList);
  const checkAll = checked => {
    checked
      ? setCheckItems(cartList?.map(item => item.foodId))
      : setCheckItems([]);
  };

  const checkSingle = (checked, id) => {
    checked
      ? setCheckItems(prev => [...prev, id])
      : setCheckItems(checkItems.filter(item => item !== id));
  };

  const deleteSelectItem = () => {
    fetch(`${API.CART_API}?foodId=${checkItems.join(',')}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    });
    setIsDelete(true);
  };

  const goToPaymentPage = () => {
    const uniqueItems = [...new Set(checkItems)];
    navigate(
      `/payments/checkout?${uniqueItems
        .map(item => `foodId=${item}`)
        .join('&')}`
    );
  };

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    fetch(`${API.CART_API}/cart`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCartList(data);
      });
    setIsDelete(false);
  }, [token, isDelete]);

  useEffect(() => {
    fetch('/data/recommandData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setRecommandList(data);
      });
  }, []);

  return (
    <div className="cart">
      <div className="cart-container">
        <section className="shopping-basket">
          <h1 className="shopping-basket-title">장바구니</h1>
          <div className="select-and-delete">
            <div className="check-all-select">
              <input
                id="check-all"
                className="check-box"
                type="checkbox"
                onChange={e => checkAll(e.target.checked)}
                checked={checkItems.length === cartList?.length}
              />
              <label htmlFor="check-all" className="select-all">
                전체 선택
              </label>
            </div>
            <button className="delete-button-select" onClick={deleteSelectItem}>
              삭제
            </button>
          </div>
          <ul>
            {renderCartList?.map(item => {
              return (
                <ProductInCart
                  key={item.foodId}
                  id={item.foodId}
                  food={item.food}
                  checkItems={checkItems}
                  checkSingle={checkSingle}
                  setProductPrice={setProductPrice}
                  productPrice={productPrice}
                  quantity={item.orderCount}
                  continent={item.continent}
                  country={item.country}
                  food_image={item.food_image}
                  orderPrice={item.orderPrice}
                  orderCount={item.orderCount}
                  setIsDelete={setIsDelete}
                />
              );
            })}
          </ul>
        </section>
        <section className="order-history">
          <h1 className="order-history-title">주문 내역</h1>
          <div className="price-info order-price">
            <span>상품 금액</span>
            <span>{productPrice.toLocaleString()}원</span>
          </div>
          <div className="price-info delivery-price">
            <span>배송비</span>
            <span>{DELIVERY_FEE.toLocaleString()}원</span>
          </div>
          <div className="price-info total-price">
            <span>총 결제 금액</span>
            <span>{(productPrice + DELIVERY_FEE).toLocaleString()}원</span>
          </div>
          <button
            className="order-button"
            onClick={goToPaymentPage}
            disabled={checkItems.length === 0}
          >
            주문결제
          </button>
        </section>
      </div>
      <section className="product-recommendation-list">
        <div className="product-recommendation-list-title-box">
          <h2 className="product-recommendation-list-title">추천상품</h2>
        </div>
        <ul className="product-in-recommendation">
          {recommandList.map(item => (
            <ProductRecommendation
              key={item.id}
              title={item.title}
              titleEng={item.titleEng}
              price={item.price}
              foodImg={item.foodImg}
              recommandList={recommandList}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Cart;

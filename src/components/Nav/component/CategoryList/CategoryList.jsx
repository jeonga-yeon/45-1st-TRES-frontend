import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CATEGORY_DATA from './CATEGORY_DATA';
import ContinentData from '../../../../data/ContinentData';
import './CategoryList.scss';

const CategoryList = () => {
  const [currentMenuId, setCurrentMenuId] = useState(CATEGORY_DATA.length);
  const subCategory = ContinentData;

  const enterMouse = id => {
    setCurrentMenuId(id - 1);
  };
  const leaveMouse = () => {
    setCurrentMenuId(CATEGORY_DATA.length);
  };

  return (
    <div className="category-box" onMouseLeave={leaveMouse}>
      <ul className="category-list">
        {CATEGORY_DATA.map(({ id, name, engName }) => {
          return (
            <li
              key={id}
              className="category-item"
              onMouseEnter={() => enterMouse(id)}
            >
              {name}
            </li>
          );
        })}
      </ul>
      {currentMenuId !== 5 && (
        <div className="sub-category" onMouseLeave={leaveMouse}>
          <div className="sub-category-box">
            {subCategory[currentMenuId].map(({ id, name, engName }) => {
              return (
                <Link
                  className="sub-category-link"
                  key={id}
                  to={`/product-list/${id}`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;

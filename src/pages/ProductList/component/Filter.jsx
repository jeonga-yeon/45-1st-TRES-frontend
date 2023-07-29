import React from 'react';
import FilterDetail from './FilterDetail';
import './Filter.scss';
import { useNavigate } from 'react-router-dom';

const Filter = ({ continent }) => {
  const navigate = useNavigate();
  return (
    <div className="filter">
      <ul className="country">
        {continent.map(({ id, country }) => (
          <li
            className="country-list"
            key={id}
            onClick={() => navigate(`/product-list/${id}`)}
          >
            <span>{country}</span>
          </li>
        ))}
      </ul>
      {FILTER_TITLE.map(title => (
        <FilterDetail key={title.id} name={title.name} option={title.option} />
      ))}
    </div>
  );
};

export default Filter;

const VEGE_OPTION = [
  { id: 0, category: 'vegetarian', type: 'vegetarian', content: '채식주의자' },
];
const MEAT_OPTION = [
  { id: 1, category: `meatId`, type: 'cow', content: '소' },
  { id: 2, category: `meatId`, type: 'pig', content: '돼지' },
  { id: 3, category: `meatId`, type: 'sheep', content: '양' },
  { id: 4, category: `meatId`, type: 'chicken', content: '닭' },
  { id: 5, category: `meatId`, type: 'blank', content: 'blank' },
];
const ALLERGY_OPTION = [
  { id: 1, category: 'allergyId', type: 'milk', content: '우유' },
  { id: 2, category: 'allergyId', type: 'peanut', content: '땅콩' },
  { id: 3, category: 'allergyId', type: 'egg', content: '계란' },
  { id: 4, category: 'allergyId', type: 'blank', content: 'blank' },
];

const FILTER_TITLE = [
  { id: 0, name: '채식', option: VEGE_OPTION },
  { id: 1, name: '고기', option: MEAT_OPTION },
  { id: 2, name: '알러지', option: ALLERGY_OPTION },
  { id: 3, name: '맵기' },
];

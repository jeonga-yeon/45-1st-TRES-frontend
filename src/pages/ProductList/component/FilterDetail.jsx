import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import OptionChecks from './OptionChecks';
import './FilterDetail.scss';

const FilterDetail = ({ name, option, url, setUrl }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const spiceLevel = useRef();

  const handleSpiceLevel = e => {
    searchParams.set('spiceLevel', e.target.value);
    setSearchParams(searchParams);
  };
  const handleReset = () => {
    searchParams.delete('spiceLevel');
    setSearchParams(searchParams);
    spiceLevel.current.value = 0;
  };
  return (
    <div className="filter-detail">
      <div className="filter-header">
        <p className="filter-name">{name}</p>
        <img
          className="sort-img"
          alt="더보기"
          src={`/images/icon/${
            isChecked ? 'angle-up-solid' : 'angle-down-solid'
          }.svg`}
          onClick={() => setIsChecked(prev => !prev)}
        />
      </div>
      {isChecked &&
        (option ? (
          option.map(item => (
            <OptionChecks
              url={url}
              setUrl={setUrl}
              key={item.id}
              item={item}
              isChecked={isChecked}
            />
          ))
        ) : (
          <div className="filter-check">
            <input
              ref={spiceLevel}
              className="filter-range"
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="3"
              defaultValue={
                searchParams.get('spiceLevel')
                  ? searchParams.get('spiceLevel')
                  : 0
              }
              onClick={handleSpiceLevel}
            />
            <label htmlFor="volume" />
            <p className="filter-reset">
              <span className="reset-button" onClick={handleReset}>
                reset
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default FilterDetail;

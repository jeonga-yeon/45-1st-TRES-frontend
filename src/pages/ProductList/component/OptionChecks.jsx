import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './OptionChecks.scss';

const OptionChecks = ({ item: { id, category, type, content }, isChecked }) => {
  const [checked, setChecked] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkInput = useRef();

  const VEGETARIAN = 'vegetarian';

  useEffect(() => {
    if (searchParams.get(VEGETARIAN) === `"yes"` && category === VEGETARIAN) {
      setChecked(true);
    }
  }, [isChecked]);

  useEffect(() => {
    if (category === VEGETARIAN) {
      if (checked === true) {
        searchParams.set(VEGETARIAN, `"yes"`);
        setSearchParams(searchParams);
      } else {
        searchParams.delete(VEGETARIAN);
        setSearchParams(searchParams);
      }
    } else {
      if (checked === true) {
        searchParams.append(category, id);
        setSearchParams(searchParams);
      } else {
        let deletedParams = searchParams.toString();
        deletedParams = deletedParams.split('&');
        deletedParams = deletedParams
          .filter(param => param !== `${category}=${id}`)
          .join('&');
        setSearchParams(deletedParams);
      }
    }
  }, [checked]);

  return (
    type !== 'blank' && (
      <div className="filter-check" key={id}>
        <input
          className="filter-input"
          type="checkbox"
          id={type}
          name={type}
          ref={checkInput}
          checked={
            category === 'vegetarian'
              ? searchParams.get(category) === `"yes"`
                ? true
                : false
              : searchParams.getAll(category).indexOf(id.toString()) !== -1
              ? true
              : false
          }
          onChange={() => setChecked(checkInput.current.checked)}
        />
        <label className="filter-label" htmlFor={type} />
        <label className="label-name" htmlFor={type}>
          {content}
        </label>
      </div>
    )
  );
};

export default OptionChecks;

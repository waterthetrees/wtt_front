import React, { useState } from 'react';

import { Form } from '@/components/Form';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { GreenButton, WhiteButton } from '@/components/Button';

import './SideMenu.scss';

export default function SideMenu({ state, ...props }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    state.inputs.forEach((input) => {
      input.name
        ? (payload[`${input.name}`] = e.target[`${input.name}`].value)
        : null;
    });

    // Submit payload
  };

  return (
    <div className="communityform">
      <span className="form__header">{state.header}</span>
      <p className="form__summary">{state.summary}</p>
      <p></p>
      {state.header === 'Report Broken Link' && (
        <div className="form__search">
          <p className="form__search__label">
            Search Broken Link or Organization
          </p>
          <p></p>
          <SearchBar
            search={search}
            onChange={handleSearch}
            style={{
              div: { width: '100%', borderRadius: '.3vw' },
              input: { borderRadius: '.3vw' },
            }}
            placeholder={'Search Broken Link or Organization'}
          />
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <>
          <div className="form__fields">
            {state.inputs.map((input, i) => (
              <div key={i} className="form__fields__text">
                <label className="form__fields__text__label">
                  {input.label}
                </label>
                <input
                  className="form__fields__text__input"
                  name={input.name}
                />
              </div>
            ))}
          </div>
          <div className="form__buttons">
            <WhiteButton
              type={'button'}
              onClick={props.onClick}
              sx={{ marginRight: '16px' }}
            >
              <span>Cancel</span>
            </WhiteButton>
            <GreenButton type={'submit'}>
              <span>Submit Link</span>
            </GreenButton>
          </div>
        </>
      </Form>
    </div>
  );
}
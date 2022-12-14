import React, { useState, useEffect, useRef } from 'react';

import { Form } from '@/components/Form';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { GreenButton, GrayButton } from '@/components/Button';

import './SideMenu.scss';

export default function SideMenu({ state, ...props }) {
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState(false);

  const handleSearch = (e) => {
    setMenu(true);
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

  const filteredLinks = state?.links?.filter((links) =>
    links.organization.toLowerCase().includes(search.toLowerCase()),
  );

  const ref = useClickOutside(() => {
    setMenu(false);
  });

  const handleMenuClick = (i) => {
    const input = document.querySelector('.form__fields__text__input');
    input.value = filteredLinks[i].link;
    setSearch(filteredLinks[i].organization);
    setMenu(false);
  };

  return (
    <div className="communityform">
      <p className="form__summary">{state.summary}</p>
      <p></p>
      {state.header === 'Report Broken Link' && (
        <div className="form__search">
          <p className="form__search__label">
            Search Broken Link or Organization
          </p>
          <p></p>
          <div ref={ref} onClick={() => setMenu(true)}>
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
          {menu && (
            <div className="form__menu">
              <div className="form__menu__container" ref={ref}>
                {filteredLinks.map((link, i) => (
                  <span key={i} onClick={() => handleMenuClick(i)}>
                    {link.organization}
                  </span>
                ))}
                {filteredLinks.length === 0 && (
                  <span>No Organization Found</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <>
          <div className="form__fields">
            {state.inputs?.map((input, i) => (
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
            <GrayButton
              type={'button'}
              onClick={props.onClick}
              sx={{ marginRight: '16px' }}
            >
              <span>Cancel</span>
            </GrayButton>
            <GreenButton type={'submit'}>
              <span>Submit Link</span>
            </GreenButton>
          </div>
        </>
      </Form>
    </div>
  );
}

// handle export close menu when clicking outside

function useClickOutside(handler) {
  const ref = useRef();
  useEffect(() => {
    const onClose = (e) => {
      if (!ref.current?.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', onClose);

    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  });

  return ref;
}

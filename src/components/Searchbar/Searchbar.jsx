import { useState } from "react";
import React from "react"
import css from 'components/Searchbar/searchbar.module.css'

export default function  Searchbar({onSubmit})  {
  const [query, setQuery] = useState('');

 const searchImages = (e) => {

  setQuery(e.currentTarget.value.toLowerCase());
  }

  const passQuery = e => {
    e.preventDefault();
    if (query.trim() === "") {
      return;
    }
    onSubmit(query)
    setQuery('');
  };


    return (<header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={passQuery}>
        <input
          className={css.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={searchImages}

        />
        <button className={css.SearchFormbutton} type="submit">
          <span className={css.SearchFormbuttonlabel}>Search</span>
        </button>
      </form>
    </header>
    );
  
};
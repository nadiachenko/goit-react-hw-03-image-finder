import React, { Component } from "react"
import css from 'components/Searchbar/searchbar.module.css'

export class Searchbar extends Component {
  state = {
    query: ''
  }

  searchImages = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  }

  passQuery = e => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      return;
    }
    this.props.onSubmit(this.state.query)
    this.setState({ query: '' });
  };

  render() {
    return (<header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={this.passQuery}>
        <input
          className={css.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.query}
          onChange={this.searchImages}

        />
        <button className={css.SearchFormbutton} type="submit">
          <span className={css.SearchFormbuttonlabel}>Search</span>
        </button>
      </form>
    </header>
    );
  };
};
import {Component} from "react";
import './header.css';

export default class Header extends Component {

  state = {
    term: '',
    searchStatus: this.props.searchStatus
  }
  onSearchChange = (e)=> {

    const term = e.target.value;

    if(term.trim().length !== 0){
      this.setState({ term } )
      this.props.onSearchChange(term);
    } else {
      this.setState({ term: '' } )
      this.props.onSearchChange('');
    }
  }

  render() {

        return (
          <header>
          <div className="container header-flex">
              <hgroup className="title-wrapper">
                  <h1 className="title">Popular</h1>
                  <h2 className="subtitle">films searcher</h2>
              </hgroup>

              <section className="search">
                  <form className="search__form">
                      <h2 className="search__form-head">Search</h2>
                      <label className="search__form-block">
                          <input type="text" name="searchText"
                          className="search__form-input"
                          autoComplete="off"
                          id="searchText"
                          placeholder="Write the title of the movie (or part of the title)..."
                          value={ this.state.searchStatus() === 'Search results' ? this.state.term : '' }
                          onChange={ this.onSearchChange }/>
                      </label>
                  </form>
              </section>
          </div>
      </header>
        );
  }
}





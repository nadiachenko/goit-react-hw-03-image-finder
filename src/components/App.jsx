

import { Component } from "react"
import 'components/styles.css'
import { Searchbar } from "components/Searchbar/Searchbar"
import ImageGallery from "components/ImageGallery/ImageGallery"

export class App extends Component {
  state = {
    query: '',
    page: 1,
  }

  addQuery = (query) => {
    this.setState({ query, page: 1 });
  }
  loadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  render() {

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.addQuery} />
          <ImageGallery query={this.state.query} page={this.state.page} loadMore={this.loadMore} />
        </div>
      </>
    );
  }
};

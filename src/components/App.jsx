

import { Component } from "react"
import 'components/styles.css'
import { Searchbar } from "components/Searchbar/Searchbar"
import ImageGallery from "components/ImageGallery/ImageGallery"

export class App extends Component {
  state = {
    query: '',
  }

  addQuery = (query) => {
    this.setState({ query });
  }

  render() {

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.addQuery} />
          <ImageGallery query={this.state.query} />
        </div>
      </>
    );
  }
};

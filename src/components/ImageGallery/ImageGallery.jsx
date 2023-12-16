import { Component } from "react"
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { Button } from 'components/Button/Button'
import { Loader } from "components/Loader/Loader"
import Modal from "components/Modal/Modal"
import css from 'components/ImageGallery/imageGallery.module.css'

export default class ImageGallery extends Component {
  state = {
    hits: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true, hits: [], page: 1, error: null }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    fetch(`https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=40934415-dfd7c79ea7303db44ba7dd17c&image_type=photo&orientation=horizontal&per_page=12`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Oops... Something went wrong`)
        );
      })
      .then((hits) => {
        if (hits.hits.length === 0) {
          throw new Error(`No images found for query: ${this.props.query}`);
        }
        else {
          this.state.hits.length === 0 ?
            this.setState({ hits: hits.hits })
            :
            this.setState({ hits: [...this.state.hits, ...hits.hits] })
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));

  };

  loadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1, loading: true }),
      () => {
        this.fetchImages();
      });
  };

  toggleModal = (largeImageURL) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL: largeImageURL
    }));
  };


  render() {

    const { hits, loading, error, showModal, largeImageURL } = this.state;

    return (<div>

      {error && <div>{error.message}</div>}

      {showModal && (< Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />)}

      {hits && (<div>
        <ul className={css.ImageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              toggleModal={() => this.toggleModal(largeImageURL)}
            />
          ))}
        </ul>
      </div>
      )}

      {loading ? <div className={css.Center} ><Loader /></div> :
        !(hits.length === 0) && (hits.length % 12 === 0) &&
        <div className={css.Center}><Button loadMore={this.loadMore} className="Button" />
        </div>
      }
    </div>
    )
  }
};

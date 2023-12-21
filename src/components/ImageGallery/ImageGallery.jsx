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
    showModal: false,
    largeImageURL: ''
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ loading: true, error: null, hits: (prevProps.query !== query) ? [] : this.state.hits });

      await
        fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=40934415-dfd7c79ea7303db44ba7dd17c&image_type=photo&orientation=horizontal&per_page=12`)
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
              throw new Error(`No images found for query: ${query}`);
            }
            else {
              this.state.hits.length === 0 ?
                this.setState({ hits: hits.hits })
                :
                this.setState({ hits: [...this.state.hits, ...hits.hits] })
            }
          })
          .catch((error) => this.setState({ error }))

      this.setState({ loading: false })
    }
  }

  loadMore = () => {
    this.props.loadMore();
  };

  toggleModal = (largeImageURL) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL: largeImageURL
    }));
    this.setState({ loading: false })
  };


  render() {

    const { hits, loading, error, showModal, largeImageURL } = this.state;

    return (<div>

      {error && <div>{error.message}</div>}

      {showModal && (< Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />)}

      {hits.length > 0 && (<div>
        <ul className={css.ImageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              toggleModal={this.toggleModal}
              largeImageURL={largeImageURL}
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

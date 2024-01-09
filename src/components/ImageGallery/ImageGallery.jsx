import { useState, useEffect} from "react";
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import css from 'components/ImageGallery/imageGallery.module.css';

const ImageGallery = ({ loadMore, query, page }) => {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [prevQuery, setPrevQuery] = useState(null);

//console.log("Prevquetry", prevQuery)


const fetchSearch = async () => {
  try {
    setLoading(true);
    setError(null);

    if (prevQuery !== query) {
      setHits([]);
    }
    const response = await fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=40934415-dfd7c79ea7303db44ba7dd17c&image_type=photo&orientation=horizontal&per_page=12`);
    if (!response.ok) {
  throw new Error(`Oops... Something went wrong`);
    }
    const hitsData = await response.json();
    if (hitsData.hits.length === 0) {
  throw new Error(`No images found for query: ${query}`);
    }
    setHits(existingHits => [...existingHits, ...hitsData.hits])} 
    catch (error) {setError(error)} 
    finally {setLoading(false)}
};

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchSearch();
    setPrevQuery(query);
  }, [query, page]);


  const toggleModal = (largeImageURL) => {
   // console.log(ShowModal)
    setShowModal((prevShowModal) => !prevShowModal)
    setLargeImageURL(largeImageURL);
  };

  return (
    <div>
      {error && <div>{error.message}</div>}

      {showModal && <Modal onClose={toggleModal} largeImageURL={largeImageURL} />}

      {hits.length > 0 && (
        <div>
          <ul className={css.ImageGallery}>
            {hits.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                toggleModal={toggleModal}
                largeImageURL={largeImageURL}
              />
            ))}
          </ul>
        </div>
      )}

      {loading ? <div className={css.Center}><Loader /></div> :
        !(hits.length === 0) && (hits.length % 12 === 0) &&
        <div className={css.Center}><Button loadMore={loadMore} className="Button" /></div>
      }
    </div>
  );
};

export default ImageGallery;

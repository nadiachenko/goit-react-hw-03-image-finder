import css from 'components/ImageGalleryItem/imageGalleryItem.module.css'

export const ImageGalleryItem = ({ webformatURL, toggleModal, largeImageURL }) => {

  return (<li className={css.ImageGalleryItem}>
    <img onClick={() => toggleModal(largeImageURL)} className={css.ImageGalleryItemimage} src={webformatURL} alt="test" />
  </li>);

}


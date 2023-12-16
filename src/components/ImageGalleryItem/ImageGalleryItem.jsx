import css from 'components/ImageGalleryItem/imageGalleryItem.module.css'

export const ImageGalleryItem = ({ webformatURL, toggleModal }) => {

  return (<li className={css.ImageGalleryItem}>
    <img onClick={toggleModal} className={css.ImageGalleryItemimage} src={webformatURL} alt="test" />
  </li>);

}


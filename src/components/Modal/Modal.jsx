import { Component } from "react"
import { createPortal } from "react-dom"
import css from 'components/Modal/modal.module.css'

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = (e) => {
    if (e.code === 'Escape') {
      console.log(this.props)
      this.props.onClose();
    }
  }

  backdropClose = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }

  render() {

    return createPortal(<div className={css.Overlay} onClick={this.backdropClose}>
      <div className={css.Modal}>
        <img src={this.props.largeImageURL} alt="test" />
      </div>
    </div>,
      modalRoot,
    );
  }
}
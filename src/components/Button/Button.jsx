
import css from 'components/Button/button.module.css'
export const Button = ({ loadMore }) => {

    return (<button onClick={()=>loadMore()} className={css.Button}>
        Load More
  </button>);

}

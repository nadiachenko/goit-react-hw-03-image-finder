
import { useState } from "react";

import 'components/styles.css'
import Searchbar  from "components/Searchbar/Searchbar"
import ImageGallery from "components/ImageGallery/ImageGallery"

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const addQuery = (query) => {
    setQuery(query)
    setPage(1)
  }

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
 

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={addQuery} />
          <ImageGallery query={query} page={page} loadMore={loadMore} />
        </div>
      </>
    );
  
};

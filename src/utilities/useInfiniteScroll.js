import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);  //detect scroll event
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    //if isFetching true, callback called
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    //if equals with total height of page and isFetching false, then isFetching true to activate callback
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
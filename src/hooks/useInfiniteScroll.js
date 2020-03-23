import { useState , useEffect } from 'react';
import { STORY_INCRIMENT , MAX_STORIES } from '../constants';
import { debounce } from '../utils/debounce'
export const useInfiniteScroll = () => {
  const[ loading, setLoading ] = useState(false);
  const[ count, setCounting ] = useState(STORY_INCRIMENT);

  const handleScroll = debounce(() => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading){
      return false;
    }
    setLoading(true);
  },100);

  useEffect(() => {
    if(!loading) return

    if(count + STORY_INCRIMENT >= MAX_STORIES){
      setCounting(MAX_STORIES);
    }else {
      setCounting(count + STORY_INCRIMENT);
    }

    setLoading(false);
  }, [loading])

  useEffect(() => {
    window.addEventListener('scroll' , handleScroll);
    return () => window.removeEventListener('scroll' , handleScroll);

  }, []);

  return { count };
}
import React, { useEffect } from "react";
import { GifState } from "../context/Gif-Context";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";
const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGIFs = async () => {
    const { data } = await gf.trending({
      linit: 20,
      type: filter,
      rating: "g",
    });

    setGifs(data);
  };
  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />
      <FilterGif showTrending/>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return(<Gif gif={gif} key={gif.title}/>)
        })}
      </div>
    </div>
  );
};

export default Home;
// columns se masonary like pinterest layout aa jata hain
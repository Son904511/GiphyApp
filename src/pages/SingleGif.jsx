import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-Context";
import Gif from "../components/Gif";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import FollowOn from "../components/Follow";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import CommentSection from "../components/CommentSection";
import RatingSystem from "../components/RatingSystem";
import ReactionSystem from "../components/RatingSystem";
const SingleGif = () => {
  const contentType = ["gifs", "sticker", "text"];
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const[readMore,setReadMore]=useState()
  const { gf ,addToFavorites,favorites} = GifState();

  const EmbedGif = () => {
    const embedCode = `<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    navigator.clipboard.writeText(embedCode)
      .then(() => alert("Embed code copied to clipboard!"))
      .catch((error) => console.error("Failed to copy embed code", error));
  }
  const shareGif = () => {
    if (navigator.share) {
      navigator.share({
        title: gif.title,
        url: window.location.href,
      }).catch((error) => console.error("Error sharing", error));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [slug]);
  
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
            <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className="h-14"/>
            </div>
            <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name} </div>
              <div className="">@{gif?.user?.username} </div>
            </div>
            {gif?.user?.description &&(
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
              {readMore?gif?.user?.description:gif?.user?.description.slice(0,100)+"..."}
              <div className="flex items-center cursor-pointer font-bold text-sm text-gray-400"
              onClick={()=>setReadMore(!readMore)}>
                {!readMore ?(
                  <>
                    Read Less <HiMiniChevronUp size={20}/>
                  </>
                ):(
                  <>
                    Read More <HiMiniChevronDown size={20}/>
                  </>
                )}
              </div>
              </p>
            )}
          </>
        )}
        <FollowOn/>
        <div className="w-full h-0 my-6 bg-gray-800"/>
        {gif?.source &&(
          <div>
          <span className="font-bold text-sm text-gray-400">Source
          </span>
          <div className="flex items-center text-sm font-bold gap-1">
          <HiOutlineExternalLink size={25}/>
          <a href={gif.source} taget="_blank" className="truncate">
            {gif.source}
          </a>
          </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-ful sm:w-3/4">
            <div className="font-bold text-sm text-gray-400 truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false}/>
            <ReactionSystem />
            <CommentSection />

            {/* mobileUi */}
            <div className="flex sm:hidden gap-1">
            <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className="h-14"/>
            <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name} </div>
              <div className="">@{gif?.user?.username} </div>
            </div>

            <button className="ml-auto"
            // onClick={shareGif}
            >
              <FaPaperPlane size={25}/>
            </button>
            </div>
            
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
          <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
          </div>

          <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <div
                key={gif.id}
                onClick={() => navigate(`/gif/${type}/${gif.slug}`)} // Navigate to the new GIF
                className="cursor-pointer"
              >
                <Gif gif={gif} />
              </div>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
//whitespace-pre-line-->properly format desc
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "C:/Users/hp/giphy/giphy-app/src/App.css";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/Gif-Context";
import GifSearch from "./GifSearch";



const Header = () => {
  const [categories, setCatogries] = useState([]);
  const [showCategories, setshowCategories] = useState(false);

  const {gf,favorites}= GifState();
  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCatogries(data);
  };
  
  useEffect(() => {
    fetchGifCategories();
    // console.log(categories)
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Giphy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories */}

          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 hover:bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setshowCategories(!showCategories)}>
            <HiEllipsisVertical
              className={`py-0.5 hover:bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 
            ${
              showCategories
                ? "bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600"
                : ""
            }
            border-b-4 hidden lg:block `}
              size={35}
            />
          </button>

          {favorites.length>0 && <diV className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favorites">Favorites GIFs</Link>
          </diV>}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories?.map((category)=>{

              return (
                <Link key={category.name}
                className="font-bold" to={`/${category.name_encoded}`}>
                {category.name}   
                </Link>
              )
            })}
            </div>
          </div>
        )}
      </div>

      {/* search */}
      <GifSearch/>
    </nav>
  );
};

export default Header;
// tracking tight:all text closer to each other

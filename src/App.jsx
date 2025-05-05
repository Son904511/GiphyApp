import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Category from "./pages/Category";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import SingleGif from "./pages/SingleGif";
import AppLayout from "./layouts/AppLayout";
import GifProvider from "./context/Gif-Context";
import Search from "./pages/SearchPage";

//homepage
//categories
//search
//single gif
//favorites

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search/>,
      },
      // : for dynamic allocation of different routes
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);
function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;

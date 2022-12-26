import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import BlogDetails from "./components/BlogDetails";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route exact path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

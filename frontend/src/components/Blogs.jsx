import axios from 'axios'
import React,{ useEffect,useState } from 'react'
import Blog from './Blog'


const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/").catch(error => console.log(error))
    const data = await res.data
    return data
  }
  useEffect(() => {
  sendRequest().then(data =>setBlogs(data.blog))
  }, [])
  // console.log(blogs)
  return (
    <div >
      {
        blogs ? blogs.map((blog, index) => (< Blog isUser={localStorage.getItem("userId") === blog.user._id} blog={blog} key={index} /> )) : <h1>No Blog Found</h1>
        }
    </div>
  )  
}

export default Blogs
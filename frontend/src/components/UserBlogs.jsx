import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog'


const UserBlogs = () => {
  const id = localStorage.getItem("userId")
  const [user, setUser] = useState()

  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:8080/api/blog/user/${id}`).catch(error => console.log(error))
    const data = await res.data
    return data
  } 
  useEffect(() => {
    sendRequest().then(data =>setUser(data.user))
  }, [])
  console.log(user)
  // const {title, description, image,user} = blogs
  return (
    
    <div>
      {user && user.blogs ? user.blogs.map((blog, index) => 
      <Blog isUser={true} blog={blog} key={index} />
      ): <h1>No Blog Found</h1>}
    </div>
  )
}

export default UserBlogs
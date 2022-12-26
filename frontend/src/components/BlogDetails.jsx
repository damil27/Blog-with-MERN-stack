import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const BlogDetails = () => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState()
  const labelStyle = { mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }

  const id = useParams().id
  console.log(id)

    const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageUrl: ""
  })
  const handleChange = (e) => {
    setInputs(preState => ({
      ...preState,
      [e.target.name]:  e.target.value
    }))
  }
  

  const fetchDatails = async () => {
    const res = await axios.get(`http://localhost:8080/api/blog/${id}`).catch(err => console.log(err))
    const data = res.data
    return data
  }

  useEffect(() => {
    fetchDatails().then(data => {
      setBlog(data)
      setInputs({title:data.blog.title, description: data.blog.description, imageUrl: data.blog.image})
    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:8080/api/blog/update/${id}`, {
      title : inputs.title,
      description: inputs.description
    }).catch(err => console.log(err))
    const data = await res.data
    return data 
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest().then(data =>console.log(data)).then(() => navigate("/myBlogs"))
  }
  
  // console.log(blog.blog)
  return (
    <div >
      {inputs && <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="green" borderRadius={5} boxShadow="10px 10px 20px #ccc" margin={"auto"} padding={3} marginTop={4} display="flex" flexDirection={"column"} width="65%" >
          <Typography fontWeight={"bold"} padding={2} variant="h4" textAlign={"center"} >Make a Post</Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
          <InputLabel sx={labelStyle} >Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' type={"textarea"} />
          
          <Button variant='outlined' color="success" type='submit'> Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetails
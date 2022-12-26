import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'


const AddBlog = () => {
  const labelStyle = { mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }
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
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:8080/api/blog/add/", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageUrl,
      user: localStorage.getItem("userId")
    }).catch(err => console.log(err))
    const data = res.data
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(inputs)
    sendRequest().then(data => console.log(data))
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="green"  borderRadius={5} boxShadow="10px 10px 20px #ccc" margin={"auto"} padding={3} marginTop={4} display="flex" flexDirection={"column"} width="65%" > 
          <Typography fontWeight={"bold"} padding={2} variant="h4" textAlign={"center"} >Make a Post</Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
          <InputLabel  sx={labelStyle} >Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' type={"textarea"} />
          <InputLabel sx={labelStyle} >Image Url</InputLabel> 
          <TextField name='imageUrl' value={inputs.imageUrl} onChange={handleChange} margin='normal' variant='outlined' />
        <Button variant='outlined' color="success" type='submit'> Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
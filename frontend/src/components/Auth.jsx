import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleonChange = (e) => {
    setInputs((preState) => ({
      ...preState,
      [e.target.name]: e.target.value
    })
    )
  }
  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:8080/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))
    const data = await res.data
    console.log(data)
    return data 
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(inputs)
    if (isSignup) {
      
      sendRequest("signup").then(data =>localStorage.setItem("userId", data.user._id)).then(() =>dispatch(authActions.login()))
    } else {
      sendRequest().then(data =>localStorage.setItem("userId", data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate('/blogs'))
    }
    
  }
  return (
    <div >
      <form onSubmit={handleSubmit} >
        <Box
          display={"flex"}
          flexDirection={'column'}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"} padding={3}
          margin={'auto'}
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant='h2' padding={2} textAlign={'center'} > {isSignup ? "SignUp":"Login"}</Typography>
          { isSignup && <TextField onChange={handleonChange} name='name' value={inputs.name} placeholder='Name' type={"text"} margin={'normal'} />}
          <TextField onChange={handleonChange} name='email' value={inputs.email} placeholder='Email' type={"email"} margin={'normal'} />
          <TextField onChange={handleonChange} name='password' value={inputs.password} placeholder='Password' type={"password"} margin={'normal'} />
          <Button type='submit'  variant='contained' sx={{marginTop: 2, borderRadius: 3}} color="success" size='medium' >Submit</Button>
          <Button onClick={() =>setIsSignup(!isSignup)}  sx={{marginTop: 2}} size="small" >Change To {isSignup ? "Login":"SignUp"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth
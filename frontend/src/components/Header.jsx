import React,{ useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store'
import { useDispatch, useSelector } from 'react-redux'



const Header = () => { 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
  return (
      <div>
          <AppBar position='sticky' sx={{background: '#023430'}} >
              <Toolbar>
                  <Typography variant='h4' >
                      Logo
                  </Typography>
                  { isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
                      
                    <Tabs  textColor="inherit" value={value} onChange={(e, val) => setValue(val)} >
                        <Tab  LinkComponent={Link} to="/blogs"  label="All Blogs" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
                    </Tabs>
                  </Box>}
                  <Box display="flex" marginLeft="auto">
                      {!isLoggedIn && <>
                        <Button LinkComponent={Link} to="/auth" sx={{margin:1}} variant='contained' color='success' >Login</Button>
                        <Button LinkComponent={Link} to="/auth" sx={{ margin: 1}} variant='contained' color='success' >SIgnup</Button>
                      </>
                      }
                      {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout() )} LinkComponent={Link} to="/auth" sx={{ margin: 1}} variant='contained' color='success' >Logout</Button>}
                  </Box>
              </Toolbar>
          </AppBar>
     </div>
  )
}

export default Header
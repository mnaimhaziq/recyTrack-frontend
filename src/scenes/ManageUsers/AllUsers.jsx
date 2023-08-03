import React, {useState, useEffect} from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery, IconButton, InputBase, Pagination, TextField} from '@mui/material'

import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersByPage } from '../../redux/Auth/AuthSlice'
import Users from '../../components/Users'

import { Row, Col } from "react-bootstrap";
import FlexBetween from '../../components/FlexBetween'
import { Search } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

function AllUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useUser();
  const AllUsers = useSelector((state) => state.auth.getUsersByPage);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

   const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPage(1);

    // Clear the previous timeout if exists
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the search after 1 second
    const timeout = setTimeout(() => {
      dispatch(getUsersByPage({ token: user.token, page: page, search: value }));
    }, 1000);

    setSearchTimeout(timeout);
  };


  useEffect(() => {
    dispatch(getUsersByPage({ token: user.token, page: page, search }));
  }, [page]); 

  

  useEffect(() => {
    setTotalPages(AllUsers.pages)
  },[dispatch, user.token, page, AllUsers.pages,search])

 
   
  return (
    <Box m="1.5rem 2.5rem">
       <Box
        display={isNonMobile ? "flex" : "block"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          m: "2rem 2rem 3rem"
        }}
      >
        <Header title="Manage Users"  />

        <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
            id="search"
            label="Search By User Name"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
          />
          
        </Box>
      </Box>
       
        <Row>{AllUsers.data && AllUsers.data.map((user) => (
          <Col key={user._id} sm={12} md={4} lg={3}>
          <Users user={user}  />
        </Col>
        ))}
        </Row>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            sx={{
              m: "2rem 0",
              "& .Mui-selected": { backgroundColor: "rgba(101, 180, 55, 0.4) !important" },
            }}
            count={totalPages}
            page={page}
            variant="outlined"
            onChange={handlePageChange}
            siblingCount={1}
            showFirstButton
            showLastButton
          />
        </Box>
        
    </Box>
  )
}

export default AllUsers
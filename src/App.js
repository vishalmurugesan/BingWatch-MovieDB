import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button,Row,Col } from 'react-bootstrap';
import logo from './logo.png';



const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=8f6d3eb0b75e6cb3858b2b48fec10a05";

function App() {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
      <Navbar className='header' bg='info' expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">
          <img 
              src={logo}
              width="200"
              height="80"
              className="d-inline-block align-top rounded-"
              alt="Your Brand Logo"
            />
            
          </Navbar.Brand>
          <Navbar.Brand  href="/home"> 
          <div   className="d-flex align-items-center">
           
              <h1  style={{marginLeft:"300px" }}><kbd className='trending' style={{backgroundColor: "Black" , color:"#30D5C8"}}>TRENDING</kbd></h1>
            
          </div> </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className='bg-dark'/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll
              
            ></Nav>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off"  >
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query} onChange={changeHandler}
                style={{ backgroundColor: "black", color: "#30D5C8" ,
                "::placeholder": { color:"#5BC0DE"}}}
              ></FormControl>
              <Button
                className='border-0'
                style={{ backgroundColor: "black" ,color:"#30D5C8" }}
                type="submit"
              >Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row xs={1} sm={2} md={2} lg={4} xl={4} className="mx-0 my-5">
          {movies.map((movieReq) => (
            <Col key={movieReq.id}>
              <MovieBox {...movieReq} />
            </Col>
          ))}
        </Row>
      </Container>
   
    </>
  );
}

export default App;
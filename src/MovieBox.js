import { Modal,Button} from 'react-bootstrap';
import React, {useEffect, useState,useCallback} from 'react';
const API_IMG="https://image.tmdb.org/t/p/w500/";

const MovieBox =({original_title, poster_path, vote_average, release_date, overview,id})=>{
    
    const [show, setShow]=useState(false);
    const [trailerKey , setTrailerKey] = useState(null);
    const [cast,setTopCast] = useState([]);
    const [rating , setRating] = useState(null);
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState(null);
    const [director, setDirector] = useState('');


    const handleShow = async() =>{
      setShow(true);
      await fetchMovieDetails();
    };

    const handleClose=()=>setShow(false);
    //fetch details
    const fetchMovieDetails = useCallback(async() => {
      try{
        const apiKey = '8f6d3eb0b75e6cb3858b2b48fec10a05';

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}` 
        )
        const videoData = await videoResponse.json();

        const trailer = videoData.results.find((video) => video.type === 'Trailer');

        if (trailer){
          setTrailerKey(trailer.key);
        }else{
          setTrailerKey(null);
        }
        // cast details
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        )
        const castData = await castResponse.json();
        const topCastMembers = castData.cast.slice(0,5);
        setTopCast(topCastMembers);

        //genre
        const genreResponse = await fetch (
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=genres`
        )
        const genreData = await genreResponse.json()
        const movieGenres = genreData.genres.map((genre) => genre.name);
        setGenres(movieGenres);

        //rating
        setRating(vote_average)

        // runtime
        setRuntime(genreData.runtime);

        //director name
        const crew = castData.crew;
        const directors = crew.filter((crewMember) => crewMember.job === 'Director');
        if (directors.length > 0) {
          setDirector(directors.map((director) => director.name).join(', '));
        } else {
          setDirector('Director information not available');

      }} catch (error){
        console.error('Error fetching movie details:', error);
      }
      },[id,vote_average]);

      useEffect(() => {
        fetchMovieDetails();
      },[fetchMovieDetails]);

    
    return(
        <div className="card text-center bg-secondary mt-4 ms-4 border-0 " >
            <div className="card-body pt-5 px-5 pb-1 rounded  bg-dark" >
              <img className="card-img-top" src={API_IMG+poster_path} alt={original_title}/>
              <div className="card-body p-1">
                <h4 className='text-info'>{original_title}</h4>
                  <button 
                  type="button"
                   className="btn btn-dark mt-4 text-info" 
                   style={{backgroundColor: "Black"}}
                   onClick={handleShow} 
                   >Details
                   </button>
                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header className='bg-info text-dark border-0'closeButton>
                        <Modal.Title>
                          <h3>{original_title}</h3>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className='bg-dark text-info'>
                      <img className="card-img-top" style={{width:'14rem'}}src={API_IMG+poster_path} alt={original_title} />
                      <h5>Rating: {rating}</h5>
                      <h5>Genres: {genres.join(', ')}</h5>
                      <h5>Runtime: {runtime} minutes</h5>
                      <h5>Director(s): {director}</h5>
                      <h5>Cast:</h5>
                      <ul>
                        {cast.map((actor) => (
                        <li key={actor.id}>{actor.name}</li>
                          ))}
                      </ul>

                      <h5>Release Date: {release_date}</h5>
                      <br></br>
                      <h5>Overview:</h5>
                      <p>{overview}</p>
                      {trailerKey && (
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title="Trailer"
                    className="embed-responsive-item"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
                      </Modal.Body>
                      <Modal.Footer className='bg-info border-0'>
                          <Button className='bg-dark text-info' onClick={handleClose}>Close</Button>
                      </Modal.Footer>
                  </Modal>
              </div>
            </div>
        </div>
    )
}

export default MovieBox;
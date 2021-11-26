import React,{useState,useEffect} from "react";
import {Movie,Button,Menu,Modal} from 'components'
import { useLocation,useNavigate } from "react-router-dom";
import './Detail.css'

const Detail =()=>{
    const[open,setOpen]=useState(false)

    const navigateToRegister=useNavigate()
    const user=JSON.parse(sessionStorage.getItem('user'))

    const openModal=()=>{
        setOpen(true)
    }

    const closeModal=()=>{
        setOpen(false)
        navigateToRegister('/')
    }

    if(!user){
        useEffect(()=>{
            openModal()
        })
        return<>
         <Modal open={open}>
                        <div className="header">-- Warning message --</div>
                        <div className="body">
                            You need to register first 
                        </div>
                        <div className="footer">
                            <Button size="small" handleClick={closeModal}>Close</Button>
                        </div>
                    </Modal>
        </>
    }

    const location =useLocation()
    const {movie}=location.state
    const{yt_trailer_code}=movie
    const navigate=useNavigate()

    const likes=JSON.parse(sessionStorage.getItem('likes'))||{}

    const watchMovieTrailer=()=>{
        window.location.href=yt_trailer_code? `https://www.youtube.com/watch?v=${yt_trailer_code}`: ""
    }
    const toHomePage=()=>{
        navigate('/home')
    }

    return(
        <div className='Detail-container'>
            <Menu>
                <Button handleClick={toHomePage}>Home</Button>
            </Menu>
            <div className='Detail-contents'>
                <Movie title={movie.title}
                genres={movie.genres}
                cover={movie.medium_cover_image}
                year={movie.year}
                rating={movie.rating}
                likes={likes[movie.id]}>
                </Movie>
                <div className='Movie-info'>
                    <p className='Movie-runtime'>Runtime{movie.runtime}min.</p>
                    <span>Summary</span>
                    <p className='Movie-summary'>{movie.summary}</p>
                    <a href={movie.torrents.length !==0?movie.torrents[0].url:''}download>Torrent</a><br/>
                    <Button handleClick={watchMovieTrailer}>Trailer</Button>
                </div>
            </div>
        </div>
    )
}

export default Detail
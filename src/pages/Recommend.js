import React,{useState,useEffect} from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import {Movie,Menu,Button,Modal} from 'components'
import './Recommend.css'

const Recommend=()=>{
    const [open,setOpen]=useState(false)

    const navigateToRegister=useNavigate()
    const user=JSON.parse(sessionStorage.getItem('user'))

    const openModal = ()=>{
        setOpen(true)
    }

    const closeModal = ()=>{
        setOpen(false)
        navigateToRegister('/')
    }

    if(!user){
        useEffect(()=>{
            openModal()
        })
        return <>
        <Modal open={open}>
            <div className="header">Warning</div>
            <div className="body">You need to register first</div>
            <div className="footer"><Button handleClick={closeModal}>Close</Button></div>
        </Modal>
        </>
    }

    const location= useLocation()
    const {movies}=location.state
    const navigate=useNavigate()
    console.log(movies)

    const likes=JSON.parse(sessionStorage.getItem('likes'))||{}

    const toHomePage=()=>{
        navigate('/home')
    }

    const bestMovies=movies.sort((a,b)=>{
        return(b.rating-a.rating);
    })
    .slice(0,3)
    .map(movie=><Link key={movie.id}
    to='/detail'
    state={{movie}}
    style={{textDecoration:'none', color:'white'}}>
        <Movie title={movie.title}
        genres={movie.genres}
        cover={movie.medium_cover_image}
        summary={movie.summary}
        year={movie.year}
        rating={movie.rating}
        likes={likes[movie.id]}/>
    </Link>)

    const likesArray=[]
    for(let like in likes){
        likesArray.push({id:like,favorite:likes[like]})
    }

    const bestMoviesByLikes=likesArray
    .sort((a,b)=>{
        return(b.favorite-a.favorite)
    })
    .slice(0,3)
    .map(likeInfo=>{
        const movieId=parseInt(likeInfo.id)
        const movie=movies.filter(movie=>movie.id===movieId)[0]
        console.log('movie by likes',parseInt(likeInfo.id))

        return(
            <Link key={movie.is}
            to='/detail'
            state={{movie}}
            stype={{textDecoration:'none',color:'white'}}>
            <Movie
            title={movie.title}
            genres={movie.genres}
            cover={movie.medium_cover_image}
            summary={movie.summary}
            year={movie.year}
            rating={movie.rating}
            likes={likes[movie.id]}></Movie>
            </Link>
        )
    })

    return(
        <div className='Recommendation-container'>
            <Menu>
                <Button handleClick={toHomePage}>Home</Button>
            </Menu>
            <div className='Recommendation-text first-text'>Best Movies by rating</div>
            <div className='Recommendation-bestmovies'>{bestMovies}</div>
            <div className='Recommendation-text second-text'>Best Movies by likes</div>
            <div className='Recommendation-bestmovies'>{bestMoviesByLikes}</div>
        </div>
    )
}

export default Recommend
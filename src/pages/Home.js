import React,{useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Input, Button, Movie, Loading, Menu, Modal } from 'components'
import './Home.css'

const Home = () =>{
    const [open,setOpen]=useState(false)

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

    const [loading, setLoading] =useState(true)
    const [movies,setMovies]=useState([])
    const [query,setQuery]=useState('')
    const [isSorted, setIsSorted]=useState(-1)
    const [year,setYear]=useState('최신순')
    const [limit, setLimit]=useState(6)
    const navigate=useNavigate()

    const likes=JSON.parse(sessionStorage.getItem('likes'))||{}
    console.log(likes)

    useEffect(()=>{
        fetch('https://yts.mx/api/v2/list_movies.json?limit=20')
        .then(res=>res.json())
        .then(result=>{
            const{data:{movies}}=result
            console.log(result)
            setLoading(false)
            setMovies(movies)
        })
    },[])

    const handleChange=(e)=>{
        const {value}=e.target
        setQuery(value)
    }

    const sortByYear=(e)=>{
        setIsSorted(isSorted*-1)
        if(isSorted==-1) setYear('과거순')
        else setYear('최신순')
    }

    const handleRemove=(id)=>{
        const moviesFiltered=movies.filter(movie=>movie.id !==id)
        setMovies(moviesFiltered)

        const likes=JSON.parse(sessionStorage.getItem('likes'))||{}
        delete likes[id]
        sessionStorage.setItem('likes',JSON.stringify(likes))
    }

    const updateLikes=(id)=>{
        const likes=JSON.parse(sessionStorage.getItem('likes'))||{}

        if(likes[id]===null||likes[id]===undefined){
            likes[id]=0
        }
        likes[id]+=1
        sessionStorage.setItem('likes',JSON.stringify(likes))
    }
    
    const displayEntireMovies=()=>{
        if(limit==6)
        setLimit(movies.length)
        else setLimit(6)
    }

    const homeUI=movies.filter(movie=>{
        const title=movie.title.toLowerCase()
        const genres=movie.genres.join(' ').toLowerCase()
        const q=query.toLowerCase()

        return title.includes(q)||genres.includes(q)
            })
            .sort((a,b)=>{
                return(b.year-a.year)*isSorted;
            })
            .slice(0,limit)
            .map(movie=>
                <div className='movie-item' key={movie.id}>
                    <div className='movie-delete' onClick={(e)=>handleRemove(movie.id)}>X</div>
                    <Link to='/detail' style={{textDecoration:'none', color:'white'}} state={{movie}} onClick={()=>updateLikes(movie.id)}>
                        <Movie
                        key={movie.id}
                        title={movie.title}
                        genres={movie.genres}
                        cover={movie.medium_cover_image}
                        year={movie.year}
                        rating={movie.rating}
                        likes={likes[movie.id]}/>
                    </Link>
                </div>
            )
    
    const toRankPage=()=>{
        navigate('/recommend',{state:{movies}})
    }

    return(
        <>
            {loading? <Loading/>:
            <div className="Home-container">
                <Menu>
                    <Button handleClick={toRankPage}>Rank</Button>
                </Menu>
                <div className='Home-entire'>
                    <Button handleClick={displayEntireMovies}>전체목록</Button>
                </div>
                <div className='Home-contents'>
                <Input name='search' type='text' placeholder='Search movies' value={query} onChange={handleChange}/>
                <Button handleClick={sortByYear}>{year}</Button>
                <div className="Home-movies">
                    {homeUI}
                </div>
                </div>
            </div>
            }
        </>
    )
}

export default Home
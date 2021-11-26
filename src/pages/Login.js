import React, {useReducer,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Input,Button,Modal} from 'components'
import './Login.css'

const Login = () =>{
    const [id,setId]= useState('')
    const [password, setPassword]=useState('')
    const [open,setOpen]=useState(false)
    const navigate =useNavigate()

    const handleChange=(e)=>{
        const{name,value}=e.target
        name==='id'?setId(value):setPassword(value)
        console.log(name,value)
    }

    const isNotValid=(user)=>{
        console.log(user)
        return user.id===''||user.password===''
    }

    const handleLogin= () =>{
        const user=JSON.parse(sessionStorage.getItem('user'))
        if(!isNotValid(user)&&(id===user.id&&password===user.password)){
            navigate('/home')
        }
        else{
            openModal()
        }
    }

    const openModal=()=>{
        setOpen(true)
    }

    const closeModal=()=>{
        setOpen(false)
    }

    return(
        <div className="login-container">
            <Input name="id" type="text" placeholder="ID" value={id} onChange={handleChange}/><br/>
            <Input name="password" type="password" placeholder="PASSWORD" value={password} onChange={handleChange}/>
            <Button handleClick={handleLogin}>Login</Button>
            <Modal open={open}>
                <div className="header">Warning</div>
                <div className="body">You gaved wrong id or password</div>
                <div className="footer"><Button size="small" handleClick={closeModal}>Close</Button></div>
            </Modal>
        </div>
    )
}

export default Login
import React, {useState} from 'react'
import {Input,Button,Modal} from 'components'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Register= () =>{
    const [id,setId]= useState('')
    const [password, setPassword]=useState('')
    const [open,setOpen]=useState(false)
    const navigate =useNavigate()

    const handleChange=(e)=>{
        const{name,value}=e.target
        name==='id'?setId(value):setPassword(value)
        console.log(name,value)
    }

    const handleRegister=()=>{
        if(JSON.parse(sessionStorage.getItem('user'))){
            navigate('/login')
        }else{
            if(id!==''&&password!==''){
                sessionStorage.setItem('user',JSON.stringify({id,password}))
                navigate('/home')
            }else{
                openModal()
            }
        }
    }

    const openModal=()=>{
        setOpen(true)
    }

    const closeModal=()=>{
        setOpen(false)
    }

    return(
        <div className="register-container">
            <Input name="id" type="text" placeholder="ID" value={id} onChange={handleChange}/><br/>
            <Input name="password" type="password" placeholder="PASSWORD" value={password} onChange={handleChange}/>
            <Button handleClick={handleRegister}>Login</Button>
            <Modal open={open}>
                <div className="header">Warning</div>
                <div className="body">You need to give right user information</div>
                <div className="footer"><Button size="small" handleClick={closeModal}>Close</Button></div>
            </Modal>
        </div>
    )
}

export default Register
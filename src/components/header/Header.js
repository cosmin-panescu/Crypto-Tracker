import React from 'react'
import './Header.css'
import { AppBar, Container, MenuItem, Toolbar, Typography, Select } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  // click logo --> go to Homepage
  const navigate = useNavigate();
  const handleClickTitle = () => {
    navigate('/');
  }

  return (
    <div className="header">
      <h1 onClick={handleClickTitle} className='title'><span>C</span>rypto<span>W</span>orld</h1>
    </div>
  )
}

export default Header
import React from 'react'
import LogoDevIcon from '@mui/icons-material/LogoDev';
import "./header.css"

function HeaderLeft({setToggle,toggle}) {
  return (
    <div className="header-left">
        <div className="header-logo">
         
          <LogoDevIcon />
          <strong>blog</strong>
        </div>
        <div onClick={() => setToggle(pre => !pre)} className="header-menu">

         {toggle ?  <i className="bi bi-x-lg"></i> :  <i className="bi bi-list"></i>}
        </div>
      </div>
  )
}

export default HeaderLeft
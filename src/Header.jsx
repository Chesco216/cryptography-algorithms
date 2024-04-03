import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <>
    <header>

      <NavLink to='/'>
        <span style={{margin:30}}>ELGamal</span>
      </NavLink>

      <NavLink to='/md5'>
        <span style={{margin:30}}> MD5</span>
      </NavLink>

    </header>
    </>
  )
}

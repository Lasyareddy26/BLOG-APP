import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function AuthorProfile() {
  return (
    <div className='author-profile mt-4'>
      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <NavLink to='articles' className="nav-link">Articles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="article" className="nav-link new-article rounded-4 text-white">Add new article</NavLink>
        </li>
      </ul>
      <div className="mt-5 container">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile
import React from 'react'
import { Link } from 'react-router'

const styles = {
  navbar: {
    borderRadius: 0
  }
}

const Navbar = () => {
  return (
    <nav className='navbar navbar-inverse' style={styles.navbar}>
      <div className='container-fluid'>
        <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>Logbuuk</Link>
        </div>

        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
          </ul>

          <ul className='nav navbar-nav navbar-right'>
            <li><a href='#'>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

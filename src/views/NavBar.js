import React from 'react'
import { Link } from 'react-router'

export class NavBar extends React.Component {
  render () {
    const style = {
      navbar: {
        borderRadius: 0
      }
    }

    return (
      <nav className='navbar navbar-inverse' style={style.navbar}>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'>Logbuuk</a>
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
}

export default NavBar

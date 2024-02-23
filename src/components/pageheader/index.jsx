import React from 'react'
import { useLocation } from 'react-router-dom';
import './pageheader.css'

export default function PageHeader() {
  const styles = {
    navBar: {
      backgroundColor: "#124244ff",
      color: "#61ae9aff",
      display: "flex",
      justifyContent: "center"
    }
  }

  const location = useLocation();
  console.log(location.pathname)

  if(location.pathname == "/") {
    return;
  }

  return (
    <nav className='navbar sticky-top' style={styles.navBar}>
      PlantPoppa
    </nav>
  )
}

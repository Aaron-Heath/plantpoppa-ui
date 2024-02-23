import React from 'react'
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

  return (
    <nav className='navbar sticky-top' style={styles.navBar}>
      PlantPoppa
    </nav>
  )
}

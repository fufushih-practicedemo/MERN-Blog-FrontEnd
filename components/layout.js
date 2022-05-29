import React from 'react'
import Header from './header'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <p>footer</p>
    </React.Fragment>
  )
}

export default Layout
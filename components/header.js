import React, { useState, useEffect } from 'react'
import { APP_NAME } from '../config';
import {
  Collapse,
  Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarBrand
} from 'reactstrap';
import Link from 'next/link';
import {Router, useRouter} from 'next/router';
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth';


const Header = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);


  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('route start complete')
      NProgress.start()
    }
    router.events.on('routeChangeStart', handleRouteChange)
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('route change complete')
      NProgress.done()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.done()
    }
    router.events.on('routeChangeError', handleRouteChange)
  }, [])

  useEffect(() => {
    (typeof window !== 'undefined') && setIsBrowser(true);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {
              isBrowser && !isAuth() && (
                <React.Fragment>
                  <NavItem>
                    <Link href="/signup">
                      <NavLink>
                        Signup
                      </NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/signin">
                      <NavLink>
                        Signin
                      </NavLink>
                    </Link>
                  </NavItem>
                </React.Fragment>
              )
            }
            
            {
              isBrowser && isAuth() && isAuth().role === 0 && (
                <NavItem>
                  <Link href="/user">
                    <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                  </Link>
                </NavItem>
              )
            }
            {
              isBrowser && isAuth() && isAuth().role === 1 && (
                <NavItem>
                  <Link href="/admin">
                    <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                  </Link>
                </NavItem>
              )
            }
            {
              isBrowser && isAuth() && (
                <NavItem>
                    <NavLink 
                      onClick={() => signout(() => Router.replace('/signin'))}
                      style={{cursor: 'pointer'}}
                    >Signout</NavLink>
                </NavItem>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header
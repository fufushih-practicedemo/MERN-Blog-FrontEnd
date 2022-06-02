import React, { useState, useEffect } from 'react'
import { APP_NAME } from '../config';
import {
  Collapse,
  Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarBrand
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import { signout, isAuth } from '../actions/auth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

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
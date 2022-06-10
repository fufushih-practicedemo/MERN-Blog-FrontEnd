import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth';
import Link from 'next/link';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  })

  const { email, password, error, loading, message, showForm} = values;

  useEffect(()=> {
    isAuth() && Router.push('/');
  }, []);

  const handleSubmit = e => {
    e.preventDefault()
    // console.table({name, email, password, error, loading, message, showForm})
    setValues({...values, loading: true, error: false})
    const user = {name, email, password}

    signin(user)
      .then(data => {
        console.log(data)
        if(data.error) {
          setValues({...values, error: data.error, loading:false});
        } else {
          // save user token to cookie and user info to local storage
          // authenticate user
          authenticate(data, ()=> {
            if(isAuth() && isAuth().role === 1) {
              Router.push('/admin');
            } else {
              Router.push('/user');
            }
          })
          
        }
      })
  }

  const handleChange = name => e => {
    // console.log(e.target.value)
    setValues({...values, error: false, [name]: e.target.value});
  }

  const showLoading = () => (loading ? <div className='alert alert-info'>Loading...</div> : '');
  const showError = () => (error ? <div className='alert alert-info'>{error}</div> : '');
  const showMessage = () => (message ? <div className='alert alert-info'>{message}</div> : '');


  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input value={email} type="email" onChange={handleChange('email')} className='form-control' placeholder='Type your email' />
        </div>

        <div className='form-group'>
          <input value={password} type="password" onChange={handleChange('password')} className='form-control' placeholder='Type your password' />
        </div>

        <div>
          <button className='btn btn-primary'>Signin</button>
        </div>
      </form>
    )
  }

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className='btn btn-outline-danger btn-sm'>Reset password</a>
      </Link>
    </React.Fragment>
  )
}

export default SigninComponent
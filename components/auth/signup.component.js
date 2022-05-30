import Router from 'next/router';
import React, { useState, useEffect } from 'react'
import { signup, isAuth } from '../../actions/auth';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  })

  useEffect(()=> {
    isAuth() && Router.push('/');
  }, []);

  const {name, email, password, error, loading, message, showForm} = values;

  const handleSubmit = e => {
    e.preventDefault()
    // console.table({name, email, password, error, loading, message, showForm})
    setValues({...values, loading: true, error: false})
    const user = {name, email, password}

    signup(user)
      .then(data => {
        console.log(data)
        if(data.error) {
          setValues({...values, error: data.error, loading:false});
        } else {
          setValues({
            ...values, 
            name: '',
            email: '',
            password: '',
            error: '',
            loading: false,
            message: data.message,
            showForm: false
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


  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input value={name} type="text" onChange={handleChange('name')} className='form-control' placeholder='Type your name' />
        </div>

        <div className='form-group'>
          <input value={email} type="email" onChange={handleChange('email')} className='form-control' placeholder='Type your email' />
        </div>

        <div className='form-group'>
          <input value={password} type="password" onChange={handleChange('password')} className='form-control' placeholder='Type your password' />
        </div>

        <div>
          <button className='btn btn-primary'>Signup</button>
        </div>
      </form>
    )
  }

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  )
}

export default SignupComponent
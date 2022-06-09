import React from 'react'
import SigninComponent from '../components/auth/signin.component'
import {withROuter} from 'next/router'
import Layout from '../components/layout'

const Signin = ({router}) => {
  const showRedirectMessage = () => {
    if(router.query.message) {
      return (<div className='alert alert-danger'>{router.query.message}</div>)
    } else {
      return
    }
  }

  return (
    <Layout>
      <h2 className='text-center pt-4 pb-4'>Signin</h2>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {showRedirectMessage()}
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <SigninComponent />
        </div>
      </div>
    </Layout>
  )
}

export default withROuter(Signin)
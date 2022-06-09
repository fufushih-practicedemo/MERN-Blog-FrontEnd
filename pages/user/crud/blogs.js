import React from 'react'
import Layout from '../../../components/layout'
import Private from '../../../components/auth/private.component'
import { isAuth } from '../../../actions/auth'

import BlogRead from '../../../components/crud/blogRead'

const Blogs = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogRead username={username} />
            </div>
          </div>
      </div>
      </Private>
    </Layout>
  )
}

export default Blogs
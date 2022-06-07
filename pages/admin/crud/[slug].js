import React from 'react'
import Layout from '../../../components/layout'
import Admin from '../../../components/auth/admin.component'
import BlogUpdate from '../../../components/crud/blogUpdate'

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Update blog</h2>
            </div>
            <div className='col-md-12'>
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blog
import React from 'react'
import Layout from '../../../components/layout'
import Admin from '../../../components/auth/admin.component'
import BlogRead from '../../../components/crud/blogRead'
const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Manage blog</h2>
            </div>
            <div className='col-md-12'>
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blogs
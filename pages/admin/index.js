import React from 'react'
import Admin from '../../components/auth/admin.component'
import Layout from '../../components/layout'
import Link from 'next/link';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Admin Dashboard</h2>
            </div>
            <div className='col-md-4'>
              <ul class="list-group">
                <li class="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category or tag</a>
                  </Link>
                </li>
                <li class="list-group-item">
                  <a href='/admin/crud/blog'>Create Blog</a>
                </li>

                <li class="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>

                <li class="list-group-item">
                  <Link href="/user/update">
                    <a>Update profile</a>
                  </Link>
                </li>
              </ul>

              
            </div>
            <div className='col-md-8'>right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default AdminIndex
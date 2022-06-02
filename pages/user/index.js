import React from 'react'
import Private from '../../components/auth/private.component'
import Layout from '../../components/layout'

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div>UserIndex</div>
      </Private>
    </Layout>
  )
}

export default UserIndex
import React, { useState } from 'react'
import Admin from './Admin'
import Guest from './Guest'
import Seller from './Seller'
import User from './User'

const ComponentByRoles = {
  'admin': Admin,
  'user': User,
  'guest': Guest,
  'seller': Seller
}
const getUserRole = (params) => ComponentByRoles[params] || ComponentByRoles['guest']

function App() {
  const [role, setRole] = useState('admin')
  const CurrentUser = getUserRole(role)

  return (
    <>
      <CurrentUser/>
    </>)
}

export default App
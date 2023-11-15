import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Index from './components/users/Index'
import Create from './components/users/Create'
import Details from './components/users/Details'
import Edit from './components/users/Edit'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/user/index' element={<Index/>}/>
        <Route path='/user/:id' element={<Details/>}/>
        <Route path='/user/create' element={<Create/>}/>
        <Route path='/user/edit/:id' element={<Edit/>}/>
        <Route path='*' element={<h2>Page Not Found</h2>}/>

      </Routes>
      </div>
  )
}

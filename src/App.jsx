import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Index from './components/users/Index'
import Create from './components/users/Create'
import Details from './components/users/Details'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/user/index' element={<Index/>}/>
        <Route path='/user/:id' element={<Details/>}/>
        <Route path='/user/create' element={<Create/>}/>
      </Routes>
      </div>
  )
}

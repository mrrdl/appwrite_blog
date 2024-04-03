import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authservice from './appwrite/auth'
import {login,logOut} from './store/authSlice'
import { Footer,Header } from './components'
import {Outlet} from 'react-router-dom'

function App() {

  const[loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
  authservice.getCurrUser()
  .then((userData)=>{
    if (userData) {
      dispatch(login(userData))
    } else {
      dispatch(logOut())
    }
  })
  .finally(()=>{setLoading(false)})
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between
    bg-grey-400'>
      <div className='w-full-block'>
        <Header/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App

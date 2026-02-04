import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import Navbar from './components/Navbar/Navbar'
import FOOTER from './components/Footer/Footer'
import { useAuth } from './store/useAuth'
import { useEffect } from 'react'
import {Navigate} from 'react-router-dom'

function App() {
  const {authUser,checkAuth,onlineUsers } = useAuth()
  useEffect(() =>{
    checkAuth()
  },[checkAuth])

  console.log('onlineUsers', onlineUsers)
  


  return (
    <>  
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser? <LoginPage/> :<Navigate to='/'/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage/> :<Navigate to='/'/> }/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
      </Routes>
      <FOOTER/>
     
    </>
  )
}

export default App

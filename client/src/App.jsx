import GamePage from './pages/GamePage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import UserContext from './context/UserContext'
import PrivateRoute from './PrivateRoute'
import Signup from './components/Signup'
import ChatPage from './pages/ChatPage'



function App() {
  return (
    <>
      <UserContext>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<HomePage />} path='/' />
              <Route element={<GamePage />} path='/game/:gameId' />
              <Route element={<ChatPage />} path='/chat' />
            </Route>
            <Route element={<Login />} path='/login' />
            <Route element={<Signup />} path='/signup' />
          </Routes>
        </BrowserRouter>
        {/* <Footer /> */}
        {/* <PrivateRoute>
        <Outlet />
      </PrivateRoute> */}
      </UserContext>
    </>
  )
}



export default App

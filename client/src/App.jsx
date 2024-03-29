import GamePage from './pages/GamePage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import UserContext from './context/UserContext'
import PrivateRoute from './PrivateRoute'
import Signup from './components/Signup'
import ChatPage from './pages/ChatPage'
import StartGamePage from './pages/StartGamePage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import Error from './components/Error'
import QuizPage from './pages/QuizPage'
import Quiz from './components/Quiz'
import AddQuestions from './components/AddQuestions'



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
              <Route element={<ProfileSettingsPage />} path='/profile/:userId' />
              <Route element={<StartGamePage />} path='/startgame' />
              <Route element={<QuizPage />} path='/quiz' />
              <Route element={<Quiz />} path='/quiz/:subject' />
              <Route element={<AddQuestions />} path='/quiz/add-question' />
            </Route>
            <Route element={<Login />} path='/login' />
            <Route element={<Signup />} path='/signup' />
            <Route element={<Error />} path='/*' />
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

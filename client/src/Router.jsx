
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Signup from "./components/Signup";
import Login from "./components/Login";





const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {

                path: '/game',
                element: <GamePage />

            }, {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    }
])

export default router;
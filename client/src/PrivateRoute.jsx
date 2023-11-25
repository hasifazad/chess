import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserDetailsContext } from "./context/UserContext";
import Loading from "./components/Loading";
import api from "./Axios";
import Login from "./components/Login";



let PrivateRoute = () => {

    console.log('privateroute');

    let { user, setUser } = useContext(UserDetailsContext)
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get('/user/validate').then((response) => {

            setUser({
                status: true,
                username: response.data.user.username,
                userId: response.data.user._id,
                email: response.data.user.email,
                image: response.data.user.image
            })

            setLoading(true)
        }).catch(() => {
            setLoading(true)
            console.log('eror');
        })
    }, [])
    return loading ? user.status ? <Outlet /> : <Navigate to='/login' /> : <Loading />
}

export default PrivateRoute;
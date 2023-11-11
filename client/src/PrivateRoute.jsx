import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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
                userId: response.data.user.userId,
                email: response.data.user.email
            })
            setLoading(true)
        }).catch(() => {
            setLoading(true)
        })
    }, [])
    return loading ? user.status ? <Outlet /> : <Login /> : <Loading />
}

export default PrivateRoute;
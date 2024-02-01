import React, { useEffect, useState } from 'react'
import '../../src/dist/css/adminlte.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = ({ BASE_URL }) => {
    const navigate = useNavigate()
    const [admin, setadmin] = useState({
        username: "",
        password: ""
    })


    //  store token
    const [token, settoken] = useState("")

    //  set login status
    const [isLoggedin, setisLoggedin] = useState(false)

    const calluseEffect = () => {
        let sessionlogin = localStorage.getItem("superadmintoken", token)
        if (sessionlogin) {
            setisLoggedin(true)
            navigate("/superadmin/dashboard")
        }
        else {
            console.log("session log out");
            setisLoggedin(false)
            navigate("/login")
        }
    }

    useEffect(() => {
        calluseEffect()
    }, [])


    //  onchange handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setadmin(admin => ({ ...admin, [name]: value }))
        // setadmin({ ...admin, [e.target.name]: e.target.value });

    }




    //   submit data
    const formSubmit = async (e) => {
        e.preventDefault()
        console.log(window.location.pathname)
        try {
            const { username, password } = admin;

            await axios.post(`${BASE_URL}/superadminlogin`, admin).then((resp) => {
                if (resp.data.success === true) {
                    settoken(resp.data.token)
                    localStorage.setItem("superadmintoken", resp.data.token)
                    console.log(resp.data.message);
                    window.location.reload("superadmin/dashboard");
                } else {
                    console.log(resp.data.message);
                }

            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            console.log("err");
        }
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="#" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={formSubmit} >
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name='username' value={admin.username} onChange={handleChange} placeholder="username" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name='password' value={admin.password} onChange={handleChange} placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-block w-25">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
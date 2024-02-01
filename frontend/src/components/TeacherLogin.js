import React, { useEffect, useState } from 'react'
import '../../src/dist/css/adminlte.min.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const TeacherLogin = ({ BASE_URL }) => {
    const navigate = useNavigate()
    const [admin, setadmin] = useState({
        email: "",
        password: ""
    })
    const [token, settoken] = useState("")
    const mlogin = () => {
        if (token) {
            navigate("/tdashboard/dashboard")
        }
    }
    useEffect(() => {
        mlogin()
    })



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
            const { email, password } = admin;
            console.log(BASE_URL);

            await axios.post(`${BASE_URL}/marketinglogin`, admin).then((resp) => {
                console.log(resp.data);
                if (resp.data.status === true) {
                    localStorage.setItem("marketingtoken", resp.data.token)
                    localStorage.setItem("info", resp.data.user._id)
                    localStorage.setItem("marketinglogin", true)
                    settoken(localStorage.setItem("marketingtoken", resp.data.token))
                    // navigate("/mdashboard/dashboard")
                    window.location.href = '/tdashboard/dashboard'
                    mlogin()
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
                        <Link href="#" className="h1"><b>Admin</b>LTE</Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={formSubmit} >
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name='email' value={admin.email} onChange={handleChange} placeholder="username" />
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

export default TeacherLogin
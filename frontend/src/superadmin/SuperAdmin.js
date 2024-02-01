import React, { useEffect, useState } from 'react'
//   <!-- Font Awesome -->
import '../plugins/fontawesome-free/css/all.min.css'
// <!-- Tempusdominus Bootstrap 4 -->
import '../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
// <!-- iCheck -->
import '../plugins/icheck-bootstrap/icheck-bootstrap.min.css'
// <!-- JQVMap -->
import '../plugins/jqvmap/jqvmap.min.css'
// <!-- Theme style -->
import '../dist/css/adminlte.min.css'
//   < !--overlayScrollbars -->
import '../plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
// <!-- Daterange picker -->
import '../plugins/daterangepicker/daterangepicker.css'
// <!-- summernote -->
import '../plugins/summernote/summernote-bs4.min.css'
//   < !--jQuery -->
import '../plugins/jquery/jquery.min.js'
//   <!--jQuery UI 1.11.4 -- >
import '../plugins/jquery-ui/jquery-ui.min.js'
//   <!--Resolve conflict in jQuery UI tooltip with Bootstrap tooltip-- >

//   <!--Bootstrap 4 -- >
import '../plugins/bootstrap/js/bootstrap.bundle.min.js'
//   <!--ChartJS -->
import '../plugins/chart.js/Chart.min.js'
//   <!--Sparkline -->
import '../plugins/sparklines/sparkline.js'

//   <!--AdminLTE App-- >
import '../dist/js/adminlte.js'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Rightsidebar from './components/Rightsidebar'
import { Outlet } from 'react-router-dom'
const SuperAdminDashboard = () => {

    const [login, setuserlogin] = useState(false)
    const checktoken = () => {
        const token = localStorage.getItem("superadmintoken")
        console.log("dashboard token", token);
        if (!token) {
            setuserlogin(false)
            window.location.href = '/login'
        } else {
            setuserlogin(true);
        }
    }


    useEffect(() => {
        checktoken();
    }, []);



    return (
        <div className='hold-transition sidebar-mini layout-fixed'>
            <div className="wrapper">
                <Header />
                {/* Main Sidebar Container */}

                {/* Sidebar */}
                <Sidebar />
                {/* /.sidebar */}

                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">

                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        {/*.container-fluid */}
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
                <Footer />
                {/* Control Sidebar */}
                <Rightsidebar />
                {/* /.control-sidebar */}
            </div>
        </div>
    )
}

export default SuperAdminDashboard;
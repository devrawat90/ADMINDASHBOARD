import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const checktoken = () => {
        const checktoken = localStorage.getItem("marketingtoken")
        const checkid = localStorage.getItem("info")
        const login = localStorage.getItem("marketinglogin")
        if (!checktoken && !checkid && !login) {
            window.location.href = '/admin'
        }
    }

    const logout = () => {
        const checktoken = localStorage.getItem("marketingtoken")
        const checkid = localStorage.getItem("info")
        const login = localStorage.getItem("marketinglogin")
        console.log(checktoken);
        console.log(checkid);
        console.log(login);
        if (checktoken) {
            localStorage.clear()
            // localStorage.removeItem('marketingtoken');
            // localStorage.removeItem('info');
            // localStorage.removeItem('marketinglogin');
            window.location.href = '/admin'
        }
    }
    useEffect(() => {
        checktoken()
    })

    const sidebarnavitem = [{
        id: 0,
        heading: "Dashboard",
        link: "dashboard",
        icon: "",
    }, {
        id: 1,
        heading: "Leads",
        link: "leads",
        icon: "",
    }, {
        id: 2,
        heading: "Approved",
        link: "approved",
        icon: "",
    }, {
        id: 3,
        heading: "Rejected",
        link: "rejected",
        icon: "",
    }, {
        id: 3,
        heading: "Pending",
        link: "pending",
        icon: "",
    },
    {
        id: 4,
        heading: "Logout",
        link: "",
        icon: "",
        click: () => {
            logout()
        }
    }
    ]
    // const sidebarnavitem2 = [
    //     {
    //         id: 0,
    //         heading: "Logout",
    //         link: "",
    //         icon: "",
    //         click: () => {
    //             logout()
    //         }
    //     }
    // ]

    // const sidebarnavitemdropdown = [{
    //     id: 0,
    //     mainheading: "Leads",
    //     heading1: "Direct",
    //     icon1: "",
    //     link1: "directlead",
    //     heading2: "Consultant",
    //     icon2: "",
    //     link2: "consultantlead",
    // }]


    const lists = sidebarnavitem.map((item) => {
        return <li key={item.id} className="nav-item">
            <Link to={item.link} onClick={item.click} className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                    {item.heading}
                </p>
            </Link>
        </li>
    })
    // const lists1 = sidebarnavitem2.map((item) => {
    //     return <li key={item.id} className="nav-item">
    //         <Link to={item.link} onClick={item.click} className="nav-link">
    //             <i className="nav-icon fas fa-th" />
    //             <p>
    //                 {item.heading}
    //             </p>
    //         </Link>
    //     </li>
    // })

    // const dropdownlistitem = sidebarnavitemdropdown.map((item) => {
    //     return <li key={item.id} className="nav-item">
    //         <Link to="#" className="nav-link">
    //             <i className="nav-icon fas fa-copy" />
    //             <p>
    //                 {item.mainheading}
    //                 <i className="fas fa-angle-left right" />
    //                 {/* <span className="badge badge-info right">6</span> */}
    //             </p>
    //         </Link>
    //         <ul className="nav nav-treeview">
    //             <li className="nav-item">
    //                 <Link to={item.link1} className="nav-link">
    //                     <i className="far fa-circle nav-icon" />
    //                     <p>{item.heading1}</p>
    //                 </Link>
    //             </li>
    //             <li className="nav-item">
    //                 <Link to={item.link2} className="nav-link">
    //                     <i className="far fa-circle nav-icon" />
    //                     <p>{item.heading2}</p>
    //                 </Link>
    //             </li>

    //         </ul>
    //     </li>

    // })






    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="" className="brand-link">
                <img
                    src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">Admin</span>
            </Link>
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg"
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div className="info">
                        <Link to="profile" className="d-block">
                            Alexander Pierce
                        </Link>
                    </div>
                </div>


                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                        {/*  nav items */}

                        {lists}


                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
        </aside>
    )
}

export default Sidebar
import React, { useState } from 'react'
import Breadcrum from '../Breadcrum'
import { Link } from 'react-router-dom'

const MDashboard = () => {


    const [dashboardname] = useState({
        name: "Dashboard"
    })
    return (
        <>
            <Breadcrum dashboard={dashboardname.name} />
            <div className="row">
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>150</h3>
                            <p>New Orders</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                        <Link to="#" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>
                                53<sup style={{ fontSize: 20 }}>%</sup>
                            </h3>
                            <p>Bounce Rate</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <Link to="#" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>44</h3>
                            <p>User Registrations</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <Link to="#" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>65</h3>
                            <p>Unique Visitors</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <Link to="#" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* ./col */}
            </div>
            {/* /.row */}
        </>
    )
}

export default MDashboard
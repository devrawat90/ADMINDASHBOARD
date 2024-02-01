import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SuperAdminDashboard from './superadmin/SuperAdmin';
import Dashboard from './superadmin/components/pages/Dashboard';
import CreateAdmin from './superadmin/components/pages/CreateAdmin';
import SuperadminLeads from './superadmin/components/pages/Leads';
import { useEffect, useState } from 'react';
import Teachers from './superadmin/components/pages/Teachers';
import MarketingDashboard from './marketing/marketing';
import MarketingLogin from './components/MarketingLogin';
import MDashboard from './marketing/components/pages/Dashboard';
import Approved from './marketing/components/pages/Approved';
import Leads from './marketing/components/pages/Leads';
import Rejected from './marketing/components/pages/Rejected';
import Pending from './marketing/components/pages/Pending';
import Adminlogin from './components/Adminlogin';
import AdminDashboard from './admin/Admin';
import ADashboard from './admin/components/pages/Dashboard';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './teachers/Teacher';
const BASE_URL = "http://localhost:8080";
function App() {
  const [token, setToken] = useState(false);
  const [mtoken, setMToken] = useState(false);
  const getTokens = () => {
    const tokenx = localStorage.getItem("superadmintoken");
    if (tokenx) {
      setToken(true);
    } else {
      setToken(false);
    }
  }
  const mlogin = () => {
    const tokenm = localStorage.getItem("marketingtoken");
    console.log("apptok", tokenm);
    if (tokenm) {
      setMToken(tokenm);
    }
  }
  useEffect(() => {
    getTokens();
    mlogin();
  });

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login BASE_URL={BASE_URL} />} />
        {/* Superadmin routes */}
        <Route path='superadmin' element={token ? <SuperAdminDashboard BASE_URL={BASE_URL} /> : <Navigate to="/login" />} >
          <Route path='dashboard' element={<Dashboard BASE_URL={BASE_URL} />} />
          <Route path='admins' element={<CreateAdmin BASE_URL={BASE_URL} />} />
          <Route path='leads' element={<SuperadminLeads BASE_URL={BASE_URL} />} />
          <Route path='teachers' element={<Teachers />} />
        </Route>
        {/* Marketing routes */}
        <Route path='/marketing' element={mtoken ? <Navigate to="/mdashboard/dashboard" /> : <MarketingLogin BASE_URL={BASE_URL} />} />
        <Route path='/mdashboard' element={mtoken ? <MarketingDashboard /> : <Navigate to="/marketing" />} >
          <Route path='dashboard' element={<MDashboard />} />
          <Route path='leads' element={<Leads BASE_URL={BASE_URL} />} />
          <Route path='approved' element={<Approved BASE_URL={BASE_URL} />} />
          <Route path='rejected' element={<Rejected BASE_URL={BASE_URL} />} />
          <Route path='pending' element={<Pending BASE_URL={BASE_URL} />} />
        </Route>
        {/* admin routes */}
        <Route path='/admin' element={mtoken ? <Navigate to="/adashboard/dashboard" /> : <Adminlogin BASE_URL={BASE_URL} />} />
        <Route path='/adashboard' element={mtoken ? <AdminDashboard /> : <Navigate to="/admin" />} >
          <Route path='dashboard' element={<ADashboard />} />
          {/* <Route path='leads' element={<Leads BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='approved' element={<Approved BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='rejected' element={<Rejected BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='pending' element={<Pending BASE_URL={BASE_URL} />} /> */}
        </Route>

        {/* admin routes */}
        <Route path='/teacher' element={mtoken ? <Navigate to="/tdashboard/dashboard" /> : <TeacherLogin BASE_URL={BASE_URL} />} />
        <Route path='/tdashboard' element={mtoken ? <TeacherDashboard /> : <Navigate to="/teacher" />} >
          <Route path='dashboard' element={<ADashboard />} />
          {/* <Route path='leads' element={<Leads BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='approved' element={<Approved BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='rejected' element={<Rejected BASE_URL={BASE_URL} />} /> */}
          {/* <Route path='pending' element={<Pending BASE_URL={BASE_URL} />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

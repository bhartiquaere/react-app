import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/SingIn'; 
import Dashboard from './pages/Dashboard/Dashboard';
import User from './pages/Dashboard/User';
import Main from './router/router';
import Department from './pages/Dashboard/Department';
import Designation from './pages/Dashboard/Designation';
import HOD from './pages/Dashboard/HOD';
import Tower from './pages/Dashboard/Tower';
import Room from './pages/Dashboard/Room';
import ChargeType from './pages/Dashboard/ChargeType';
import HouseAllote from './pages/Dashboard/HouseAllote';
import GenerateBill from './pages/Dashboard/GenerateBill';
function App() {
     const auth = {'accessToken':true}
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} ></Route>

        <Route element={<Main/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master/user" element={<User/>} /> 
        <Route path="/master/department" element={<Department/>} /> 
        <Route path="/master/designation" element={<Designation/>} /> 
        <Route path="/master/head-of-department" element={<HOD/>} /> 
        <Route path="/master/tower" element={<Tower/>} /> 
        <Route path="/master/room" element={<Room/>} /> 
        <Route path="/master/charge-type" element={<ChargeType/>} /> 
        <Route path="/master/house-allotment" element={<HouseAllote/>} /> 
        <Route path="/master/generate-bill" element={<GenerateBill/>} /> 
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;

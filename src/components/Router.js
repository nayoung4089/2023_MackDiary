import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Global from "routes/Global";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import MainPage from "routes/MainPage";

const AppRouter = ({isLoggedIn, userObj, refreshUser})=> {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? 
                <>
                <Route path ="/" element={<MainPage userObj = {userObj}/>} />
                <Route path ="/global" element={<Global userObj = {userObj}/>} />
                <Route path ="/profile" element={<Profile userObj = {userObj} refreshUser={refreshUser} />} />
                <Route path="*" element={ <Navigate to="/" /> } />
                </> : 
                <>
                <Route path ="/" element={<Auth />} />
                <Route path="*" element={ <Navigate to="/" /> } />
                </>
                }
            </Routes>
        </Router>
    )
}
export default AppRouter;
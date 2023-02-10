import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";

const RoutesMain = () => {
    const [ token, setToken ] = useState(null);
    // const token = localStorage.getItem("@token");

    useEffect(() => {
        const tokenStorage = localStorage.getItem("@token")
        if(!!tokenStorage){
            setToken(tokenStorage)
        }
        console.log(token, tokenStorage);
    }, [token])

    
    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={!token ? <Login token={token} setToken={setToken}/> : <Navigate to={"/contacts"}/>} />
            <Route path="/contacts" element={ !!token ? <Dashboard/> : <Navigate to="/login" />}/>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default RoutesMain;
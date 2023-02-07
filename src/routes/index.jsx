import { Route, Routes, Navigate } from "react-router-dom";

import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";

const RoutesMain = () => {

    // const token = localStorage.getItem("@token");

    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/contacts" element={<Dashboard/>}/>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default RoutesMain;
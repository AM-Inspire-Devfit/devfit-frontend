import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            {/*동일하게 라우터 추가하시면 됩니다*/}
        </Routes>


    )
}

export default AppRoutes;
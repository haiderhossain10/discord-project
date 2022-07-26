import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RootRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/*" element={<Home />} />
                    <Route path="/channel/:id" element={<Home />} />
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
};

export default RootRoute;

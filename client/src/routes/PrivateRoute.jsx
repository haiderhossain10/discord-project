import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    if ("_logged" in localStorage) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    if ("_logged" in localStorage) {
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
};

export default PublicRoute;

import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from "react-router";

export default function AuthorizedLayout() {
    const { user } = useUser();

    // Temporarily allow all authenticated users for development
    // TODO: Re-enable role check for production
    // if (user?.publicMetadata.role !== 'admin') {
    //     return <Navigate to="/" />;
    // }

    return <Outlet />;
}
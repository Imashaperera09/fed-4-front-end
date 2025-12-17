import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function AuthorizedLayout() {
    const { user } = useUser();

    if (user?.publicMetadata.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
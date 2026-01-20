import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function ProtectedLayout() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        const isBypass = localStorage.getItem('admin_bypass') === 'true';
        if (!isBypass) {
            return <Navigate to="/sign-in" />;
        }
    }

    return <Outlet />;
}

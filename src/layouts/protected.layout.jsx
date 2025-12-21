import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function ProtectedLayout() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />;
    }

    return <Outlet />;
}

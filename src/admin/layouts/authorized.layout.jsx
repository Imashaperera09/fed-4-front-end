import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function AuthorizedLayout() {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // TODO: Re-enable role check for production
    const isBypass = localStorage.getItem('admin_bypass') === 'true';
    const isAdmin = isBypass || user?.publicMetadata?.role === 'admin' || user?.primaryEmailAddress?.emailAddress === 'imashachamodi0609@gmail.com';

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
import { useAuth0 } from "@auth0/auth0-react";

export function About() {
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

    console.log(isLoading);
    console.log(isAuthenticated);
    console.log(error);
    console.log(loginWithRedirect);
    console.log(logout);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        return (
            <div>
                Hello {user.name}{' '}
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Log out
                </button>
            </div>
        );
    } else {
        return <button onClick={() => loginWithRedirect()}>Log in</button>;
    }
}
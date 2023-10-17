import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface Props {
    component: ComponentType
}

export const AuthenticationGuard = ({ component }: Props) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                Loged out
            </div>
        ),
    });

    return <Component />;
};
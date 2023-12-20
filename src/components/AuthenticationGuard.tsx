import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { AppOverlay } from "./Layout/AppOverlay/AppOverlay";

interface Props {
    component: ComponentType
}

export const AuthenticationGuard = ({ component }: Props) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <AppOverlay visible={true} />,
    });

    return <Component />;
};
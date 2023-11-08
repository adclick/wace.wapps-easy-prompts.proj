import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoadingOverlay } from "@mantine/core";
import { ComponentType } from "react";

interface Props {
    component: ComponentType
}

export const AuthenticationGuard = ({ component }: Props) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <LoadingOverlay visible />,
    });

    return <Component />;
};
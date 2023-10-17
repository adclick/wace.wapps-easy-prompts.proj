import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoadingOverlay } from "@mantine/core";
import { ComponentType } from "react";

interface Props {
    component: ComponentType
}

export const AuthenticationGuard = ({ component }: Props) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        ),
    });

    return <Component />;
};
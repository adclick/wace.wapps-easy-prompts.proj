import { LoadingOverlay, Stack, Loader, Title, Group, Image } from "@mantine/core";
import favicon from '../../../favicon.svg';
import { useDisclosure } from "@mantine/hooks";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsersLoginsQuery } from "../../../api/usersApi";
import { FC, useEffect } from "react";
import { User } from "../../../models/User";

const AppOverlay: FC = () => {
    const auth0 = useAuth0();
    const [user, setUser] = useStore(useShallow(state => [state.user, state.setUser]));
    const userLoginQuery = useUsersLoginsQuery(user);
    const [overlayVisible, overlayHandle] = useDisclosure(true);

    // Initialize User with Auth0 info
    useEffect(() => {
        if (user.isEmpty && auth0.user) {
            setUser(User.buildFromAuth0(auth0.user))
        }
    });
    
    // Login User on Database
    useEffect(() => {
        if (userLoginQuery.data && !user.isLoggedIn) {
            setUser({
                ...user,
                history_repository_id: userLoginQuery.data.history_repository_id,
                isLoggedIn: true
            });

            overlayHandle.close();
        }
    });

    return (
        <LoadingOverlay visible={overlayVisible} overlayProps={{ backgroundOpacity: 1 }} loaderProps={{
            children: <Stack align='center' gap={"lg"}>
                <Group align='end'>
                    <Image src={favicon} w={40} />
                    <Title order={1}>EasyPrompts</Title>
                </Group>
                <Loader size={"sm"} />
            </Stack>
        }} />
    )
}

export default AppOverlay;
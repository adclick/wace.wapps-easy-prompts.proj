import { LoadingOverlay, Text, Stack, Loader, Title, Group, Image } from "@mantine/core";
import favicon from '../../../favicon.svg';

interface AppOverlay {
    visible: boolean
}

export function AppOverlay({visible}: AppOverlay) {
    return (
        <LoadingOverlay visible={visible} overlayProps={{ backgroundOpacity: 1 }} loaderProps={{
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
import { Avatar, Box, Button, Card, Divider, Group, Space, Stack, Text, em, rem } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconThumbUp } from "@tabler/icons-react";

export function ChatCardIntro() {
    const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

    return (
        <Card mx={isMobile ? "0" : "xl"} radius={isMobile ? "0" : "lg"} p={"md"} shadow="sm">
            <Group align="flex-start">
                <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                <Box>
                    <Text>
                        Hi and welcome to EasyPrompts!
                    </Text>
                    <Text>
                        This web app will help you various AI systems
                    </Text>
                    <Space h={"sm"} />
                    <Text>
                        Here's some concepts that you need to know:
                    </Text>
                </Box>
            </Group>
            <Card.Section inheritPadding mt={"xl"} mb={0}>
                <Group>
                    <Button variant="subtle" size="xs" leftSection={<IconThumbUp style={{ width: rem(16), height: rem(16) }} />}>Got it!</Button>
                </Group>
            </Card.Section>
        </Card>
    )
}
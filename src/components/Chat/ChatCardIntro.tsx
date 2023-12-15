import { useAuth0 } from "@auth0/auth0-react";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { Avatar, Box, Button, Card, Divider, Group, Space, Stack, Text, Title, em, rem } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconShare, IconPrompt, IconSparkles, IconTemplate, IconThumbUp } from "@tabler/icons-react";
import { RepositoryItem } from "../../model/RepositoryItem";

interface ChatCardIntro {
    firstLogin: boolean,
    setFirstLogin: any
    aiMediatorClient: AIMediatorClient,
    theme: string
}

export function ChatCardIntro({
    firstLogin,
    setFirstLogin,
    aiMediatorClient,
    theme
}: ChatCardIntro) {


    return (
        <Box>
            <Group align="flex-start">
                <Title order={5}>
                    🌟 Welcome to EasyPrompts! 🌟
                </Title>
            </Group>
            <Space h={"md"} />


            <Stack gap={"xl"}>
                <Text>Let's learn!</Text>

                <Stack gap={"xs"}>
                    <Text fw={500}>🚀 What is it?</Text>
                    <Text>EasyPrompts is a intermediary service that powers up your experience with several AI Systems. It enables you to enrich your prompts, create powerfull re-usable recipies, and share them with anyone</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group gap={"xs"}>
                        <IconSparkles color="teal" size={20} />
                        <Text fw={500}>Craft effective Modifiers to increase you prompting quality</Text>
                    </Group>
                    <Text>Take control of your creative process by creating text blocks called "modifiers." These modifiers enrich your future prompts, adding layers of depth and uniqueness. Customize and elevate your creations with every keystroke.</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group>
                        <IconShare size={20} />
                        <Text fw={500}>Invite other to your repository and turn it into a collaborative AI team directory</Text>
                    </Group>
                    <Text>Take control of your creative process by creating text blocks called "modifiers." These modifiers enrich your future prompts, adding layers of depth and uniqueness. Customize and elevate your creations with every keystroke.</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group>
                        <IconTemplate size={20} />
                        <Text fw={500}>🚀 Create usefull Templates by combining different modifiers</Text>
                    </Group>
                    <Text>Every stroke of genius deserves recognition. Save your previous prompts in a personal list, a treasure trove of creativity. Share these gems with fellow users, inspiring and being inspired in return.</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group>
                        <IconShare size={20} />
                        <Text>🤝 Share your interactions with others:</Text>
                    </Group>
                    <Text>EasyPrompts is not just a platform; it's a community of innovative minds. Connect with like-minded explorers, exchange ideas, and collaborate on groundbreaking projects. The possibilities are endless when brilliant minds come together.</Text>
                </Stack>
                <Text fw={500}>Happy Prompting! 🌈✨</Text>
            </Stack>

        </Box>
    )
}
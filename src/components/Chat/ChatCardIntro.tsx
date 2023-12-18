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
                    <Text fw={500}>❓ What is it?</Text>
                    <Text>EasyPrompts is a intermediary service that powers up your experience with several AI Systems. It enables you to enrich your prompts, create powerfull re-usable recipies, and share them with anyone</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group gap={"xs"}>
                        <Text fw={500}>🔨 Craft effective Modifiers to increase you prompt's quality</Text>
                    </Group>
                    <Text>Take control of your creative process by creating text blocks called "modifiers." These modifiers enrich your future prompts, adding layers of depth and uniqueness. Customize and elevate your creations with every keystroke.</Text>
                    <Text fs={"italic"}>Click on Database menu and select "New Modifier"</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group gap={"xs"}>
                        <Text fw={500}>💾 Save your prompts</Text>
                    </Group>
                    <Text>Test your prompts skills and for every great response you can save your used prompt for later and optionally share it with others</Text>
                    <Text fs={"italic"}>Click on the three dots menu from the chat response and select "Save Prompt"</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group gap={"xs"}>
                        <Text fw={500}>▶ Re-use optimized prompts created by others</Text>
                    </Group>
                    <Text>Find the perfect prompt to use by browsing your database and re-use some of your saved prompts or created by others</Text>
                    <Text fs={"italic"}>Browser your database and hit "play" on one of the available prompts.</Text>
                </Stack>

                <Stack gap={"xs"}>
                    <Group>
                        <Text fw={500}>✨ Take advantage of other users modifiers</Text>
                    </Group>
                    <Text>Use your modifiers or from others by browsing your database. They can optimize your prompts response!</Text>
                    <Text fs={"italic"}>Browser your database and hit "play" on one of the available modifiers.</Text>
                </Stack>
                <Text fw={500}>Happy Prompting! 🌈✨</Text>
            </Stack>

        </Box>
    )
}
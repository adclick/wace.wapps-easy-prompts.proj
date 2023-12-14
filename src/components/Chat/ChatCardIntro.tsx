import { useAuth0 } from "@auth0/auth0-react";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { Avatar, Box, Button, Card, Divider, Group, Space, Stack, Text, Title, em, rem } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconPrompt, IconSparkles, IconTemplate, IconThumbUp } from "@tabler/icons-react";
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

            <Text>
                Let's learn!
            </Text>
            <Space h={"sm"} />

            <Text fw={500}>🚀 What is it?</Text>
            <Text>EasyPrompts is a intermediary service that powers up your experience with several AI Systems. It enables you to enrich your prompts, create powerfull re-usable prompts, and share them with anyone</Text>
            <Space h={"sm"} />

            <Text fw={500}><IconPrompt size={14} /> What are prompts?</Text>
            <Text>Every stroke of genius deserves recognition. Save your previous prompts in a personal list, a treasure trove of creativity. Share these gems with fellow users, inspiring and being inspired in return.</Text>
            <Space h={"sm"} />

            <Text fw={500}>🔧 Craft effective Your Experience with Modifiers:</Text>
            <Text>Take control of your creative process by creating text blocks called "modifiers." These modifiers enrich your future prompts, adding layers of depth and uniqueness. Customize and elevate your creations with every keystroke.</Text>
            <Space h={"sm"} />

            <Text fw={500}><IconSparkles color={RepositoryItem.getColor('modifier')} size={14} /> What are modifiers?</Text>
            <Text>Every stroke of genius deserves recognition. Save your previous prompts in a personal list, a treasure trove of creativity. Share these gems with fellow users, inspiring and being inspired in return.</Text>
            <Space h={"sm"} />

            <Text fw={500}>🚀 Apply powerfull recipies to your prompts with Templates</Text>
            <Text>Every stroke of genius deserves recognition. Save your previous prompts in a personal list, a treasure trove of creativity. Share these gems with fellow users, inspiring and being inspired in return.</Text>
            <Space h={"sm"} />


            <Text>🤝 Connect and Collaborate:</Text>
            <Text>EasyPrompts is not just a platform; it's a community of innovative minds. Connect with like-minded explorers, exchange ideas, and collaborate on groundbreaking projects. The possibilities are endless when brilliant minds come together.</Text>
            <Space h={"sm"} />

            <Text fw={500}>Happy Prompting! 🌈✨</Text>
        </Box>
    )
}
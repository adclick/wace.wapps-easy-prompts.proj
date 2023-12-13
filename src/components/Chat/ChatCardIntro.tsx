import { useAuth0 } from "@auth0/auth0-react";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { Avatar, Box, Button, Card, Divider, Group, Space, Stack, Text, Title, em, rem } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconThumbUp } from "@tabler/icons-react";

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
                    Welcome to EasyPrompts! 🌟 Greetings, Explorer of Possibilities! 🌟
                </Title>
            </Group>
            <Space h={"md"} />

            <Text>
                We're thrilled to welcome you to EasyPrompts, where the magic of language models comes to life. Brace yourself for a journey into the world of boundless creativity and unparalleled text manipulation!
            </Text>
            <Space h={"sm"} />

            <Text fw={500}>🚀 Unleash the Power of Language Models:</Text>
            <Text>At EasyPrompts, you have the power to prompt different large language models in various modes. Whether you're seeking captivating text generation, mesmerizing image creation, or precise keyword extraction, our platform is your canvas.</Text>
            <Space h={"sm"} />

            <Text>📚 Save and Share Your Brilliance:</Text>
            <Text>Every stroke of genius deserves recognition. Save your previous prompts in a personal list, a treasure trove of creativity. Share these gems with fellow users, inspiring and being inspired in return.</Text>
            <Space h={"sm"} />

            <Text>🔧 Craft Your Experience with Modifiers:</Text>
            <Text>Take control of your creative process by creating text blocks called "modifiers." These modifiers enrich your future prompts, adding layers of depth and uniqueness. Customize and elevate your creations with every keystroke.</Text>
            <Space h={"sm"} />

            <Text>🤝 Connect and Collaborate:</Text>
            <Text>EasyPrompts is not just a platform; it's a community of innovative minds. Connect with like-minded explorers, exchange ideas, and collaborate on groundbreaking projects. The possibilities are endless when brilliant minds come together.</Text>
            <Space h={"sm"} />

            <Text>🌐 Seamless and Intuitive:</Text>
            <Text>Navigating EasyPrompts is a breeze. Our user-friendly interface ensures that you can focus on your creativity without any distractions. The power to innovate is at your fingertips.</Text>
            <Space h={"sm"} />

            <Text>📜 Embark on Your Creative Odyssey:</Text>
            <Text>Are you ready to embark on a journey where imagination knows no bounds? EasyPrompts is more than a tool; it's an invitation to redefine the limits of what's possible with language models. Let your creativity soar, and let the words weave your unique story.</Text>
            <Space h={"sm"} />

            <Text>Welcome to a realm where your ideas take center stage. EasyPrompts awaits your command!</Text>
            <Text>Happy Exploring! 🌈✨</Text>
        </Box>
    )
}
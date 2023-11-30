import { Box, Button, Divider, Drawer, Group, Stack, Text, Title, rem } from "@mantine/core"
import { PromptOptionTechnology } from "./PromptOptionTechnology"
import { PromptOptionProvider } from "./PromptOptionProvider"
import { PromptOptionModificers } from "./PromptOptionModifiers"
import { IconDeviceFloppy, IconReload } from "@tabler/icons-react"
import { PromptOptionParameter } from "./PromptOptionParameter"
import { PromptOptions } from "@/model/PromptOptions"
import { Technology } from "@/model/Technology"
import { Provider } from "@/model/Provider"
import { Parameter } from "@/model/Parameter"
import { UserPromptOptions } from "@/model/UserPromptOptions"
import { Modifier } from "@/model/Modifier"
import { AIMediatorClient } from "@/clients/AIMediatorClient"
import { User } from "../../model/User"
import { Repository } from "../../model/Repository"
import { Language } from "../../model/Language"

interface PromptOptionsPanel {
    drawerOpened: any,
    closeDrawer: any,
    promptOptions: PromptOptions,
    technology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any,
    provider: Provider,
    providers: Provider[],
    handleOnChangeProvider: any,
    parameters: Parameter[],
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any,
    aIMediatorClient: AIMediatorClient,
    refreshPromptOptions: any,
    user: User,
    repository: Repository,
    language: Language
}

export function PromptOptionsPanel({
    drawerOpened,
    closeDrawer,
    promptOptions,
    technology,
    technologies,
    handleOnChangeTechnology,
    provider,
    providers,
    handleOnChangeProvider,
    parameters,
    userPromptOptions,
    setUserPromptOptions,
    modifiers,
    activeModifiers,
    setActiveModifiers,
    aIMediatorClient,
    refreshPromptOptions,
    user,
    repository,
    language
}: PromptOptionsPanel) {
    return (
        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            title={<Text fw={700} size="xl">Options</Text>}
            size={"350px"}

        >
            <Stack my={"md"} gap={"md"}>
                <PromptOptionTechnology
                    promptOptions={promptOptions}
                    currentTechnology={technology}
                    technologies={technologies}
                    handleOnChangeTechnology={handleOnChangeTechnology}
                />
                <PromptOptionProvider
                    promptOptions={promptOptions}
                    currentProvider={provider}
                    providers={providers}
                    handleOnChangeProvider={handleOnChangeProvider}
                />
                {
                    parameters.length > 0 &&
                    <Divider />
                }
                {
                    parameters.map(parameter => {
                        return (
                            <Box my={"sm"} key={parameter.slug}>
                                <PromptOptionParameter
                                    key={parameter.slug}
                                    type={parameter.slug}
                                    parameter={parameter}
                                    userPromptOptions={userPromptOptions}
                                    setUserPromptOptions={setUserPromptOptions}
                                />
                            </Box>
                        )
                    })
                }
                <Divider />
                <PromptOptionModificers
                    modifiers={modifiers}
                    activeModifiers={activeModifiers}
                    setActiveModifiers={setActiveModifiers}
                    promptOptions={promptOptions}
                    userPromptOptions={userPromptOptions}
                    setUserPromptOptions={setUserPromptOptions}
                    currentTechnologySlug={technology.slug}
                    aIMediatorClient={aIMediatorClient}
                    technology={technology}
                    refreshPromptOptions={refreshPromptOptions}
                    user={user}
                    repository={repository}
                    language={language}
                />
            </Stack>
            <Divider />
            <Group mt={"xs"} justify="space-between">
                <Button
                    px={0}
                    variant="transparent"
                    size="sm"
                    leftSection={<IconReload style={{ width: rem(16), height: rem(16) }} />}
                >
                    Reset
                </Button>
            </Group>
        </Drawer>
    )
}
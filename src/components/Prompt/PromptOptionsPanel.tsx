import { Box, Button, Divider, Drawer, Group, Stack, Text, Title, rem, Card, Tabs } from "@mantine/core"
import { ProvidersOption } from "../Options/ProvidersOption/ProvidersOption"
import { PromptOptionParameter } from "./PromptOptionParameter"
import { User } from "../../model/User"
import { Repository } from "../../model/Repository"
import { Language } from "../../model/Language"
import { PromptOptions } from "../../model/PromptOptions"
import { Technology } from "../../model/Technology"
import { Provider } from "../../model/Provider"
import { Parameter } from "../../model/Parameter"
import { UserPromptOptions } from "../../model/UserPromptOptions"
import { Modifier } from "../../model/Modifier"
import { AIMediatorClient } from "../../clients/AIMediatorClient"

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
    language: Language,
}

export function PromptOptionsPanel({
    promptOptions,
    provider,
    providers,
    handleOnChangeProvider,
    parameters,
    userPromptOptions,
    setUserPromptOptions,
}: PromptOptionsPanel) {
    return (
        <Stack mx={"xs"} my={"md"} gap={"md"}>
            <Stack>
                <ProvidersOption
                    promptOptions={promptOptions}
                    currentProvider={provider}
                    providers={providers}
                    handleOnChangeProvider={handleOnChangeProvider}
                />
            </Stack>
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
        </Stack>
    )
}
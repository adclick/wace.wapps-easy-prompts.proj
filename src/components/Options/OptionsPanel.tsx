import { Box, Button, Divider, Drawer, Group, Stack, Title, rem } from "@mantine/core"
import { TechnologyOption } from "./TechnologyOption"
import { ProviderOption } from "./ProviderOption"
import { ModifiersOption } from "./ModifiersOption"
import { IconDeviceFloppy, IconReload } from "@tabler/icons-react"
import { ParameterOption } from "./ParameterOption"
import { PromptOptions } from "@/model/PromptOptions"
import { Technology } from "@/model/Technology"
import { Provider } from "@/model/Provider"
import { Parameter } from "@/model/Parameter"
import { UserPromptOptions } from "@/model/UserPromptOptions"
import { Modifier } from "@/model/Modifier"
import { AIMediatorClient } from "@/clients/AIMediatorClient"

interface OptionsPanel {
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
    refreshPromptOptions: any
}

export function OptionsPanel({
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
    refreshPromptOptions
}: OptionsPanel) {
    return (
        <Drawer opened={drawerOpened} onClose={closeDrawer} title={<Title order={3}>Options</Title>} size={"350px"}>
            <Stack my={"md"} gap={"md"}>
                <TechnologyOption
                    promptOptions={promptOptions}
                    currentTechnology={technology}
                    technologies={technologies}
                    handleOnChangeTechnology={handleOnChangeTechnology}
                />
                <ProviderOption
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
                                <ParameterOption
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
                <ModifiersOption
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
                <Button
                    px={0}
                    variant="transparent"
                    size="sm"
                    leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} />}
                >
                    Save Template
                </Button>
            </Group>
        </Drawer>
    )
}
import { Tabs, Title, rem } from "@mantine/core";
import { OptionsPanel } from "../OptionsPanel/OptionsPanel";
import { TemplatesPanel } from "../TemplatesPanel/TemplatesPanel";
import { IconList, IconTemplate } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";
import { UserPromptOptions } from "../../model/UserPromptOptions";

interface Navbar {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    toggle: any
}

export function Navbar({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    toggle
}: Navbar) {
    return (
        <Tabs radius={"sm"} defaultValue="options">
            <Tabs.List grow>
                <Tabs.Tab value="options" leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
                    <Title order={5}>Options</Title>
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                    <Title order={5}>Templates</Title>
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="options" py={"md"}>
                <OptionsPanel
                    promptOptions={promptOptions}
                    setPromptOptions={setPromptOptions}
                    userPromptOptions={userPromptOptions}
                    setUserPromptOptions={setUserPromptOptions}
                    toggle={toggle}
                />
            </Tabs.Panel>
            <Tabs.Panel value="templates" py={"md"}>
                <TemplatesPanel />
            </Tabs.Panel>
        </Tabs>
    )
}
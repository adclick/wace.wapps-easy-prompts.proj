import { SuggestionsPanel } from "../Suggestions/SuggestionsPanel";
import { UsedPrompt } from "../../model/UsedPrompt";
import { Stack, Tabs, Title, rem } from "@mantine/core";
import { IconPrompt, IconTemplate } from "@tabler/icons-react";

interface Navbar {
    usedPrompts: UsedPrompt[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any
}

export function Navbar({
    usedPrompts,
    userPrompt,
    setUserPrompt,
    navbarToggle
}: Navbar) {
    return (
        <Tabs defaultValue="prompts" radius={"md"}>
            <Tabs.List grow>
                <Tabs.Tab value="prompts" leftSection={<IconPrompt style={{ width: rem(18), height: rem(18) }} />}>
                    <Title order={5}>Prompts</Title>
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(18), height: rem(18) }} />}>
                    <Title order={5}>Templates</Title>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="prompts">
                <SuggestionsPanel
                    usedPrompts={usedPrompts}
                    userPrompt={userPrompt}
                    setUserPrompt={setUserPrompt}
                    navbarToggle={navbarToggle}
                />
            </Tabs.Panel>

            <Tabs.Panel value="templates">
            </Tabs.Panel>
        </Tabs>

    )
}
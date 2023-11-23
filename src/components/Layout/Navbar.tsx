import { SuggestionsPanel } from "../Suggestions/SuggestionsPanel";
import { UsedPrompt } from "../../model/UsedPrompt";
import { Tabs, Title, rem } from "@mantine/core";
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
        <Tabs defaultValue="prompts">
            <Tabs.List grow>
                <Tabs.Tab value="prompts" leftSection={<IconPrompt style={{width: rem(24), height: rem(24)}} />}>
                    <Title order={4}>Prompts</Title>
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{width: rem(24), height: rem(24)}} />}>
                    <Title order={4}>Templates</Title>
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
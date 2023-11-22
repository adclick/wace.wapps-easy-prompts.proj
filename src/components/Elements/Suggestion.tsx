import { UsedPrompt } from "../../model/UsedPrompt";
import { Accordion, AccordionControl, AccordionItem, ActionIcon, Box, Group, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconPlayerPlayFilled, IconPrompt, IconTemplate } from "@tabler/icons-react";
import { SelectedOptionsWidget } from "./SelectedOptionsWidget";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";

interface Suggestion {
    usedPrompt: UsedPrompt,
    setUserPrompt: any,
    navbarToggle: any
}

export function Suggestion({
    usedPrompt,
    setUserPrompt,
    navbarToggle
}: Suggestion) {

    const use = () => {
        setUserPrompt(usedPrompt.prompt)
        navbarToggle();
    }
    return (
        <AccordionItem value={usedPrompt.prompt} py={"xs"}>
            <AccordionControl px={0}>
                <Group justify="space-between" gap={"xs"} align="center">
                    <Text size="sm" fw={500} lineClamp={20}>
                        {usedPrompt.prompt}
                    </Text>
                </Group>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <SelectedOptionsWidget
                        technology={new Technology("Text Generation")}
                        provider={new Provider("Openai")}
                        parameters={[]}
                        modifiers={[]}
                    />

                    <Group px={0} py={"xs"} justify="space-between" align="baseline">
                        <Tooltip label={`${usedPrompt.score}/100`}>
                            <Rating size="xs" readOnly color="blue" value={usedPrompt.score * 5 / 100} />
                        </Tooltip>
                        <ActionIcon variant="filled" size={"md"} onClick={use} mx={"md"}>
                            <IconPlayerPlayFilled style={{ width: "60%", height: "60%" }} />
                        </ActionIcon>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}
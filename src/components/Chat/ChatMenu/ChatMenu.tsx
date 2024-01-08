import { Button, Collapse, Group, Menu, Stack, Title, UnstyledButton, rem } from "@mantine/core";
import { IconChevronDown, IconHistory, IconPlus } from "@tabler/icons-react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { useDisclosure } from "@mantine/hooks";
import { ChatPromptProvidersField } from "../../Prompt/PromptOptionsProvidersField/PromptOptionsProvidersField";

interface ChatMenu {

}

export function ChatMenu({

}: ChatMenu) {
    const { setPromptsRequests } = usePromptsRequests();

    return (
        <Stack>
            <Button onClick={() => setPromptsRequests([])} variant="subtle" leftSection={<IconPlus size={16} stroke={3} />}>
                New Chat
            </Button>
        </Stack>
    )
}
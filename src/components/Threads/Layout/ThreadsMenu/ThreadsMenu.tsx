import { Group, Text, UnstyledButton } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { Menu } from "../../../UI/Menu";
import { iconChevronDown } from "../../../../utils/iconsUtils";

export function ThreadsMenu() {
    const { setPromptsRequests } = usePromptsRequests();

    const target = <UnstyledButton px={0}>
        <Group align='center' gap={"xs"} wrap="nowrap">
            <Text size="xl" fw={700}>
                Menu
            </Text>
            {iconChevronDown("sm", 3)}
        </Group>
    </UnstyledButton>

    return (
        <Menu
            target={target}
            items={[
                {
                    id: 1,
                    label: "Clear Threads",
                    onClick: () => setPromptsRequests([])
                }
            ]}
        />
    )
}
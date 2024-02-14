import { Group, Text, UnstyledButton } from "@mantine/core";
import { Menu } from "../../../UI/Menu";
import { iconChevronDown } from "../../../../utils/iconsUtils";
import { IconClearAll } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import { MenuType, Position } from "../../../../enums";

export function ThreadsMenu() {
    const [setPromptsRequests] = useStore(useShallow(state => [state.setPromptsRequests]));

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
            position={Position.bottom_start}
            items={[
                {
                    type: MenuType.button,
                    id: 1,
                    label: "Clear Threads",
                    icon: <IconClearAll size={14} />,
                    onClick: () => setPromptsRequests([])
                }
            ]}
        />
    )
}
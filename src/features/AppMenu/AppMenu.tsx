import { FC } from "react";
import { Text, UnstyledButton } from "@mantine/core";
import { Menu } from "../../components/UI/Menu";
import { IconChevronDown, IconClearAll } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { MenuType, Position, Size } from "../../enums";
import { FlexRow } from "../../components/UI/Layout";
import FlexAlign from "../../enums/FlexAlign";
import FlexWrap from "../../enums/FlexWrap";

const AppMenu: FC = () => {
    const [setPromptsRequests] = useStore(useShallow(state => [state.setPromptsRequests]));

    const target = <UnstyledButton px={0}>
        <FlexRow align={FlexAlign.center} gap={Size.xs} wrap={FlexWrap.nowrap}>
            <Text size="xl" fw={700}>
                My Workspace
            </Text>
            <IconChevronDown size={18} stroke={3} />
        </FlexRow>
    </UnstyledButton>

    return (
        <Menu
            target={target}
            position={Position.bottom_start}
            items={[
                {
                    type: MenuType.button,
                    id: 1,
                    label: "Clear Workspace",
                    icon: <IconClearAll size={14} />,
                    onClick: () => setPromptsRequests([])
                }
            ]}
        />
    )
}

export default AppMenu;
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
import { useWorkspaceQuery } from "../../api/workspacesApi";

const AppMenu: FC = () => {
    const [
        user,
        setPromptsRequests
    ] = useStore(useShallow(state => [
        state.user,
        state.setPromptsRequests
    ]));

    const { data: workspace } = useWorkspaceQuery(user.id);

    const target = <UnstyledButton px={0}>
        {
            workspace &&
            <FlexRow align={FlexAlign.center} gap={Size.xs} wrap={FlexWrap.nowrap}>
                <Text size="xl" fw={700}>
                    {workspace.name}
                </Text>
                <IconChevronDown size={18} stroke={3} />
            </FlexRow>
        }
    </UnstyledButton>

    return (
        <Menu
            target={target}
            position={Position.bottom_start}
            items={[
                {
                    type: MenuType.button,
                    id: 1,
                    label: "Clear",
                    icon: <IconClearAll size={14} />,
                    onClick: () => setPromptsRequests([])
                }
            ]}
        />
    )
}

export default AppMenu;
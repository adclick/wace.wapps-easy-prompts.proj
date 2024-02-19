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
import { useWorkspacesQuery } from "../../api/workspacesApi";
import { Workspace } from "../../models/Workspace";

const AppMenu: FC = () => {
    const [
        user,
        selectedWorkspace,
        setSelectedWorkspace,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedWorkspace,
        state.setSelectedWorkspace,
    ]));

    const { data } = useWorkspacesQuery(user);

    let menus = [];

    if (data && data.length > 0) {
        if (selectedWorkspace.id <= 0) {
            setSelectedWorkspace(data[0]);
        }

        menus = data.map((w: Workspace) => {
            return {
                type: MenuType.button,
                id: w.id,
                label: w.name,
            }
        })
    }

    const target = <UnstyledButton px={0}>
        {
            selectedWorkspace.id > 0 &&
            <FlexRow align={FlexAlign.center} gap={Size.xs} wrap={FlexWrap.nowrap}>
                <Text size="xl" fw={700}>
                    {selectedWorkspace.name}
                </Text>
                <IconChevronDown size={18} stroke={3} />
            </FlexRow>
        }
    </UnstyledButton>

    return (
        <Menu
            target={target}
            position={Position.bottom_start}
            items={menus}
        />
    )
}

export default AppMenu;
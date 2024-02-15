import { Collapse, SegmentedControl } from "@mantine/core";
import { FC } from "react";
import { BooleanHandle } from "../../types";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

interface UserDatabaseTypeSwitchContainerProps {
    opened: boolean,
    handle: BooleanHandle
}

const UserDatabaseTypeSwitchContainer: FC<UserDatabaseTypeSwitchContainerProps> = ({
    opened,
    handle
}: UserDatabaseTypeSwitchContainerProps) => {
    const [
        selectedPrivateDatabaseType,
        setSelectedPrivateDatabaseType
    ] = useStore(useShallow(state => [
        state.selectedPrivateDatabaseType,
        state.setSelectedPrivateDatabaseType,
    ]));

    return (
        <Collapse in={opened}>
            <SegmentedControl
                color="blue"
                size="xs"
                fullWidth
                value={selectedPrivateDatabaseType.type}
                onChange={type => setSelectedPrivateDatabaseType(new SelectedDatabaseType(type as Type))}
                data={[
                    { label: 'Promps', value: Type.PROMPT },
                    { label: 'Templates', value: Type.TEMPLATE },
                    { label: 'Modifiers', value: Type.MODIFIER },
                ]}
            />
        </Collapse>
    )
}

export default UserDatabaseTypeSwitchContainer;
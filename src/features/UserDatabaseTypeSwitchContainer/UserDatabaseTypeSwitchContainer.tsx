import { Collapse, SegmentedControl, Text } from "@mantine/core";
import { FC } from "react";
import { BooleanHandle } from "../../types";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import classes from './UserDatabaseTypeSwitchContainer.module.css'

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
                className={classes.switcher}
                color="blue"
                size="xs"
                fullWidth
                value={selectedPrivateDatabaseType.type}
                onChange={type => setSelectedPrivateDatabaseType(new SelectedDatabaseType(type as Type))}
                data={[
                    { label: (<Text fw={700} size="xs">Prompts</Text>), value: Type.PROMPT },
                    { label: (<Text fw={700} size="xs">Templates</Text>), value: Type.TEMPLATE },
                    { label: (<Text fw={700} size="xs">Modifiers</Text>), value: Type.MODIFIER },
                ]}
            />
        </Collapse>
    )
}

export default UserDatabaseTypeSwitchContainer;
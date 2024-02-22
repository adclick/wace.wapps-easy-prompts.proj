import { SegmentedControl, Text } from "@mantine/core";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import classes from './UserDatabaseTypeSwitchContainer.module.css';

const UserDatabaseTypeSwitchContainer: FC = () => {
    const [
        selectedPrivateDatabaseType,
        setSelectedPrivateDatabaseType
    ] = useStore(useShallow(state => [
        state.selectedPrivateDatabaseType,
        state.setSelectedPrivateDatabaseType,
    ]));

    let color = 'blue';
    switch (selectedPrivateDatabaseType.type) {
        case Type.TEMPLATE:
            color = 'yellow';
            break;
        case Type.MODIFIER:
            color = 'teal';
            break;
    }

    return (
        <SegmentedControl
            classNames={{
                root: classes.switcher,
                label: classes.switcherLabel
            }}
            color={color}
            size="xs"
            fullWidth
            value={selectedPrivateDatabaseType.type}
            onChange={type => setSelectedPrivateDatabaseType(new SelectedDatabaseType(type as Type))}
            data={[
                { label: (<Text fw={700} size="sm">Prompts</Text>), value: Type.PROMPT },
                { label: (<Text fw={700} size="sm">Templates</Text>), value: Type.TEMPLATE },
                { label: (<Text fw={700} size="sm">Modifiers</Text>), value: Type.MODIFIER },
            ]}
        />
    )
}

export default UserDatabaseTypeSwitchContainer;
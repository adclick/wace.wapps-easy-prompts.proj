import { Group, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import { iconChevronDown } from "../../utils/iconsUtils";
import { Menu } from "../../components/UI/Menu";
import { Position } from "../../enums/Position";
import { MenuType } from "../../enums/MenuType";
import { useSelectedDatabaseType } from "../../context/SelectedDatabaseTypeContext";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

const UserDatabseToggleMenu: FC = () => {
    const { selectedDatabaseType, setSelectedDatabaseType } = useSelectedDatabaseType();

    const onChange = (type: Type, label: Label, labelPlural: LabelPlural) => {
        const newSelectedDatabaseType = new SelectedDatabaseType();

        newSelectedDatabaseType.type = type;
        newSelectedDatabaseType.label = label;
        newSelectedDatabaseType.labelPlural = labelPlural;

        setSelectedDatabaseType(newSelectedDatabaseType);
    }

    return (
        <Menu
            width="200"
            position={Position.bottom_start}
            target={(
                <UnstyledButton px={0}>
                    <Group align='center' gap={"xs"} wrap="nowrap">
                        <Text truncate size="lg" fw={700}>
                           My {selectedDatabaseType.labelPlural}
                        </Text>
                        {iconChevronDown("xs", 3)}
                    </Group>
                </UnstyledButton>
            )}
            items={[
                {
                    type: MenuType.button,
                    id: 1,
                    label: LabelPlural.Prompts,
                    onClick: () => onChange(Type.PROMPT, Label.Prompt, LabelPlural.Prompts)
                },
                {
                    type: MenuType.button,
                    id: 1,
                    label: LabelPlural.Tempalates,
                    onClick: () => onChange(Type.TEMPLATE, Label.Tempalate, LabelPlural.Tempalates)
                },
                {
                    type: MenuType.button,
                    id: 1,
                    label: LabelPlural.Modifiers,
                    onClick: () => onChange(Type.MODIFIER, Label.Modifier, LabelPlural.Modifiers)
                },
            ]}

        />
    )
}

export default UserDatabseToggleMenu;
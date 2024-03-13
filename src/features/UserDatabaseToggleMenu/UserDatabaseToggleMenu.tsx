import { Group, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import { iconChevronDown } from "../../utils/iconsUtils";
import { Menu } from "../../components/UI/Menu";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import { FlexRow } from "../../components/UI/Layout";
import { MenuType, Position, Size } from "../../enums";
import FlexAlign from "../../enums/FlexAlign";
import FlexWrap from "../../enums/FlexWrap";

interface UserDatabaseToggleMenuProps {
    selectedDatabaseType: SelectedDatabaseType,
    setSelectedDatabaseType: any
}

const UserDatabseToggleMenu: FC<UserDatabaseToggleMenuProps> = ({
    selectedDatabaseType,
    setSelectedDatabaseType
}: UserDatabaseToggleMenuProps) => {
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
                    <FlexRow align={FlexAlign.center} gap={Size.xs} wrap={FlexWrap.wrap}>
                        <Text truncate size="lg" fw={700}>
                            My {selectedDatabaseType.labelPlural}
                        </Text>
                        {iconChevronDown("xs", 3)}
                    </FlexRow>
                </UnstyledButton>
            )}
            items={[
                {
                    type: MenuType.button,
                    id: Type.PROMPT,
                    label: `My ${LabelPlural.Prompts}`,
                    onClick: () => onChange(Type.PROMPT, Label.Prompt, LabelPlural.Prompts)
                },
                {
                    type: MenuType.button,
                    id: Type.TEMPLATE,
                    label: `My ${LabelPlural.Tempalates}`,
                    onClick: () => onChange(Type.TEMPLATE, Label.Tempalate, LabelPlural.Tempalates)
                },
                {
                    type: MenuType.button,
                    id: Type.MODIFIER,
                    label: `My ${LabelPlural.Modifiers}`,
                    onClick: () => onChange(Type.MODIFIER, Label.Modifier, LabelPlural.Modifiers)
                },
            ]}

        />
    )
}

export default UserDatabseToggleMenu;
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconPrompt, IconSparkles, IconTemplate } from "@tabler/icons-react";
import { NewModifierModal } from "../NewModifierModal/NewModifierModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../../model/SelectedDatabaseType";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";
import { Template } from "../../../model/Template";

export function DatabaseMenu() {
    const { selectedDatabaseType, setSelectedDatabaseType } = useSelectedDatabaseType();
    const [newModifierOpened, newModifierHandle] = useDisclosure(false);
    const {setSelectedModifiers} = useSelectedModifiers();
    const {setSelectedTemplate} = useSelectedTemplate();

    const onChange = (type: Type, label: Label, labelPlural: LabelPlural) => {
        const newSelectedDatabaseType = new SelectedDatabaseType();

        newSelectedDatabaseType.type = type;
        newSelectedDatabaseType.label = label;
        newSelectedDatabaseType.labelPlural = labelPlural;

        setSelectedDatabaseType(newSelectedDatabaseType);

        setSelectedModifiers([]);
        setSelectedTemplate(new Template());
    }

    return (
        <>
            <NewModifierModal opened={newModifierOpened} handle={newModifierHandle} />
            <Menu shadow="md" width={200} position='bottom-start'>
                <Menu.Target>
                    <UnstyledButton px={0}>
                        <Group align='center' gap={"xs"} wrap="nowrap">
                            <Text truncate size="xl" fw={700}>
                                {selectedDatabaseType.labelPlural}
                            </Text>
                            <IconChevronDown size={16} stroke={3} />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => onChange(Type.PROMPT, Label.Prompt, LabelPlural.Prompts)} leftSection={<IconPrompt size={14} />}>
                        {LabelPlural.Prompts}
                    </Menu.Item>
                    <Menu.Item onClick={() => onChange(Type.MODIFIER, Label.Modifier, LabelPlural.Modifiers)} leftSection={<IconSparkles size={14} />}>
                        {LabelPlural.Modifiers}
                    </Menu.Item>
                    <Menu.Item onClick={() => onChange(Type.TEMPLATE, Label.Tempalate, LabelPlural.Tempalates)} leftSection={<IconTemplate size={14} />}>
                        {LabelPlural.Tempalates}
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}
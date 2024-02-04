import { ActionIcon, Button, Fieldset, Menu, Modal, TextInput } from "@mantine/core";
import { iconAdd } from "../../../utils/iconsUtils";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ModifierForm } from "../../../forms/ModifierForm";

interface PromptAddButton {

}

export function PromptAddButton({ }: PromptAddButton) {
    const [opened, handle] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Modifier" size={"xl"}>
                <ModifierForm modifier={undefined} />
            </Modal>
            <Menu position="top-start">
                <Menu.Target>
                    <ActionIcon
                        size="lg"
                        pos={"absolute"}
                        left={30}
                        color="gray"
                        variant="transparent"
                    >
                        {
                            iconAdd("md")
                        }
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>Prompt</Menu.Item>
                    <Menu.Item>Template</Menu.Item>
                    <Menu.Item onClick={handle.open}>Modifier</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}
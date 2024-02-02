import { ActionIcon, Button, Fieldset, Menu, Modal, TextInput } from "@mantine/core";
import { iconAdd } from "../../../utils/iconsUtils";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface PromptAddButton {

}

interface Values {
    title: string
}

export function PromptAddButton({ }: PromptAddButton) {
    const [opened, handle] = useDisclosure(false);

    const values: Values = {
        title: ""
    };

    const form = useForm({
        initialValues: values,

        validate: {
            title: (value) => value !== "" ? null : 'Invalid title',
        },
    });

    const submit = (values: Values) => {
        console.log(values);
    }

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Modifier" size={"xl"}>
                <Fieldset>
                    <form onSubmit={form.onSubmit(submit)}>
                        <TextInput
                            withAsterisk
                            label="Title"
                            {...form.getInputProps('title')}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Fieldset>
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
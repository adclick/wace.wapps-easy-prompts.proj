import { Group, Input, List, Modal, Rating, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconBalloon, IconCircleCheck, IconCircleDashed, IconPrompt, IconSearch, IconTex } from "@tabler/icons-react";

interface PromptsModalProps {
    openedPrompts: any;
    close: any
}

export function PromptsModal({ openedPrompts, close }: PromptsModalProps) {
    const prompts = [
        { id: 1, name: "Run tests to make sure your changes do" },
        { id: 2, name: "Run tests to make sure your changes do" },
        { id: 3, name: "Run tests to make sure your changes do" },
        { id: 4, name: "Run tests to make sure your changes do" },
        { id: 5, name: "Run tests to make sure your changes do" },
        { id: 6, name: "Run tests to make sure your changes do" },
        { id: 7, name: "Run tests to make sure your changes do" },
        { id: 8, name: "Run tests to make sure your changes do" },
    ];

    return (
        <Modal
            size={"xl"}
            opened={openedPrompts}
            onClose={close}
            title={"Optimized Prompts"}
            transitionProps={{
                duration: 100
            }}
        >
            <Stack gap={"md"}>
                <Input placeholder="Search" leftSection={<IconSearch size={16} />} />
                <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                        <ThemeIcon size={24}>
                            <IconPrompt size="1rem" />
                        </ThemeIcon>
                    }
                >
                    {
                        prompts.map(prompt => {
                            return (
                                <List.Item key={prompt.id}>
                                    <Group justify="space-between">
                                        <Text>{prompt.name}</Text>
                                        <Rating defaultValue={2} />
                                    </Group>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </Stack>

        </Modal>
    )
}
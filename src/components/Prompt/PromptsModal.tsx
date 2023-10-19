import { Input, List, Modal, Stack, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconSearch } from "@tabler/icons-react";

interface PromptsModalProps {
    openedPrompts: any;
    close: any
}

export function PromptsModal({openedPrompts, close}: PromptsModalProps) {
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
                        <ThemeIcon color="teal" size={24} radius="xl">
                            <IconCircleCheck size="1rem" />
                        </ThemeIcon>
                    }
                >
                    <List.Item>Clone or download repository from GitHub</List.Item>
                    <List.Item>Install dependencies with yarn</List.Item>
                    <List.Item>To start development server run npm start command</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                    <List.Item
                        icon={
                            <ThemeIcon color="blue" size={24} radius="xl">
                                <IconCircleDashed size="1rem" />
                            </ThemeIcon>
                        }
                    >
                        Submit a pull request once you are done
                    </List.Item>
                </List>
            </Stack>

        </Modal>
    )
}
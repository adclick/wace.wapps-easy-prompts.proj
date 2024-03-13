import { ActionIcon, Card, Collapse, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { iconClose } from "../../utils/iconsUtils";
import { CreateTemplateButton } from "../CreateTemplateButton/CreateTemplateButton";
import { CreateModifierButton } from "../CreateModifierButton/CreateModifierButton";
import { CreatePromptButton } from "../CreatePromptButton/CreatePromptButton";
import { BooleanHandle } from "../../types";

interface CreateUserItemSectionProps {
    opened: boolean
    handle: BooleanHandle
}

export const CreateUserItemSection: FC<CreateUserItemSectionProps> = ({
    opened,
    handle,
}: CreateUserItemSectionProps) => {
    return (
        <Collapse in={opened}>
            <Card>
                <Stack>
                    <Group justify="space-between">
                        <Title order={5}>Creation toolbox</Title>
                        <ActionIcon
                            color="--mantine-color-text"
                            variant="transparent"
                            onClick={handle.close}
                        >

                            {iconClose(14)}
                        </ActionIcon>
                    </Group>
                    <CreatePromptButton />
                    <CreateTemplateButton />
                    <CreateModifierButton />
                </Stack>
            </Card>
        </Collapse>
    )
}
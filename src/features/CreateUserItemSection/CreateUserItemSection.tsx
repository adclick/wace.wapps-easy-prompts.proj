import { ActionIcon, Card, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { iconClose } from "../../utils/iconsUtils";
import { CreateTemplateButton } from "../CreateTemplateButton/CreateTemplateButton";
import { CreateModifierButton } from "../CreateModifierButton/CreateModifierButton";

interface CreateUserItemSectionProps {
    closeSection: any
}

export const CreateUserItemSection: FC<CreateUserItemSectionProps> = ({
    closeSection
}: CreateUserItemSectionProps) => {
    return (
        <Card>
            <Stack>
                <Group justify="space-between">
                    <Title order={5}>Create a new Item</Title>
                    <ActionIcon
                        color="gray"
                        variant="transparent"
                        onClick={closeSection}
                    >

                        {iconClose(14)}
                    </ActionIcon>
                </Group>
                <CreateTemplateButton />
                <CreateModifierButton />
            </Stack>
        </Card>
    )
}
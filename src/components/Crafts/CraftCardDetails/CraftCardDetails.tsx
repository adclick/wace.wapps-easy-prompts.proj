import { Group, Modal, Tabs, Text } from "@mantine/core"
import { Craft } from "../../../model/Craft"
import { useDeleteCraftMutation } from "../../../api/craftsApi";
import { notifications } from "@mantine/notifications";
import { IconDetails, IconFileDescription, IconMessage } from "@tabler/icons-react";

interface CraftCardDetails {
    opened: boolean,
    handle: any,
    craft: Craft
}

export function CraftCardDetails({
    opened,
    handle,
    craft
}: CraftCardDetails) {
    const deleteMutation = useDeleteCraftMutation();

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        deleteMutation.mutate(craft.id);
    }

    if (deleteMutation.isError) {
        notifications.show({
            title: "Error",
            message: deleteMutation.error.message,
            color: "red"
        });

        deleteMutation.reset();
    }

    if (deleteMutation.isSuccess) {
        notifications.show({
            title: "Modifier Deleted",
            message: "Your settings were saved",
            color: "blue"
        });

        deleteMutation.reset();
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={craft.name} size={"lg"}>
            <Tabs defaultValue={"details"}>
                <Tabs.List grow>
                    <Tabs.Tab leftSection={<IconFileDescription size={14} />} value="details">
                        Details
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconMessage size={14} />} value="reviews">
                        Reviews
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="details">
                </Tabs.Panel>
                <Tabs.Panel value="reviews">
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}
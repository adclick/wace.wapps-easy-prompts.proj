import { Modal, Tabs } from "@mantine/core"
import { Craft } from "../../../model/Craft"
import { useDeleteCraftMutation } from "../../../api/craftsApi";
import { notifications } from "@mantine/notifications";

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
            <Tabs>
                <Tabs.List grow>
                    <Tabs.Tab value="details">Details</Tabs.Tab>
                    <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="details">
                </Tabs.Panel>
                <Tabs.Panel value="reviews">
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}
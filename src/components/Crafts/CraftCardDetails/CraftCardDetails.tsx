import { Modal } from "@mantine/core"
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
        <Modal opened={opened} onClose={handle.close} title={craft.name}>

        </Modal>
    )
}
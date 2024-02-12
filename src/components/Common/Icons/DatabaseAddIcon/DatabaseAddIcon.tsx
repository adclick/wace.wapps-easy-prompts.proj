import { ActionIcon, Menu, Modal, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css';
import { SaveModal } from "../../SaveModal/SaveModal";
import { useDisclosure } from "@mantine/hooks";
import { CreateModifierForm } from "../../../../forms/CreateModifierForm/CreateModifierForm";

export function DatabaseAddIcon() {
    const [opened, handle] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Modifier" size={"lg"}>
                <CreateModifierForm handle={handle} />
            </Modal>
            <Tooltip label={"Create"}>
                <ActionIcon
                    className={classes.icon}
                    size="lg"
                    onClick={handle.open}
                    variant="transparent"
                >
                    {
                        iconAdd("md")
                    }
                </ActionIcon>
            </Tooltip>
        </>
    );
}
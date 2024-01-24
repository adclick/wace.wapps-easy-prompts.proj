import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css'
import { SaveModal } from "../../SaveModal/SaveModal";
import { useDisclosure } from "@mantine/hooks";

interface DatabaseAddIcon {
    onClick: any
}

export function DatabaseAddIcon({ onClick }: DatabaseAddIcon) {
    const [opened, handle] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={handle.close} title={`Save Thread`} size={"lg"}>
                <SaveModal
                    handle={handle}
                    promptRequest={undefined}
                />
            </Modal>
            <Tooltip label={"Add"}>
                <ActionIcon className={classes.icon} size="lg" onClick={handle.open} variant="transparent">
                    {
                        iconAdd("md")
                    }
                </ActionIcon>
            </Tooltip>
        </>
    )
}
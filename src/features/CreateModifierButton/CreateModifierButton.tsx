import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { FC } from "react";
import { CreateModifierForm } from "../../forms/CreateModifierForm/CreateModifierForm";
import { useDisclosure } from "@mantine/hooks";
import { iconAdd } from "../../utils/iconsUtils";
import classes from './CreateModifierButton.module.css'

export const CreateModifierButton: FC = () => {
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
    )
}


import { ActionIcon, Menu, Modal, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css';
import { SaveModal } from "../../SaveModal/SaveModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelectedDatabaseType } from "../../../../context/SelectedDatabaseTypeContext";

export function DatabaseAddIcon() {
    const [opened, handle] = useDisclosure(false);
    const { selectedDatabaseType } = useSelectedDatabaseType();

    return (
        <>
            <SaveModal
                opened={opened}
                handle={handle}
                promptRequest={undefined}
            />
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
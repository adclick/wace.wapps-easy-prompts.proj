import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css';
import { SaveModal } from "../../SaveModal/SaveModal";
import { useDisclosure } from "@mantine/hooks";

export function DatabaseAddIcon() {
    const [opened, handle] = useDisclosure(false);

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
import { Button } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './ThreadSaveButton.module.css'

interface ThreadSaveButton {
    onClick: any
}

export function ThreadSaveButton({ onClick }: ThreadSaveButton) {
    return (
        <Button
            className={classes.button}
            variant="transparent"
            size="xs"
            leftSection={iconAdd(14)}
            onClick={onClick}
        >
            Save
        </Button>
    )
}
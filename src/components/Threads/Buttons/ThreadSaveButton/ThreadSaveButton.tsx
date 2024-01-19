import { Button } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";

interface ThreadSaveButton {
    onClick: any
}

export function ThreadSaveButton({ onClick }: ThreadSaveButton) {
    return (
        <Button
            variant="transparent"
            color="gray"
            size="xs"
            leftSection={iconAdd(14)}
            onClick={onClick}
        >
            Save
        </Button>
    )
}
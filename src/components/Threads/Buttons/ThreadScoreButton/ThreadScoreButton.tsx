import { Button } from "@mantine/core";
import { iconStar } from "../../../../utils/iconsUtils";

interface ThreadScoreButton {

}

export function ThreadScoreButton({ }: ThreadScoreButton) {
    return (
        <Button
            variant="transparent"
            color="gray"
            size="xs"
            leftSection={iconStar(14)}
        >
            Good
        </Button>
    )
}
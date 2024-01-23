import { Avatar } from "@mantine/core"
import { iconPlay } from "../../../utils/iconsUtils"

interface EasyPromptsAvatar {
    size: string
}

export function EasyPromptsAvatar({ size }: EasyPromptsAvatar) {
    return (
        <Avatar
            variant="filled"
            color={"blue"}
            size={size}
            src={null}
        >
            {iconPlay(14)}
        </Avatar>
    )
}
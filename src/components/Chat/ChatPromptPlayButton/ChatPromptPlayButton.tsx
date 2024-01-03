import { ActionIcon } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useRequests } from "../../../context/RequestsContext";
import { useUserRequest } from "../../../context/UserRequestContext";

export function ChatPromptPlayButton() {
    const { requests, setRequests } = useRequests();
    const { userRequest } = useUserRequest();

    const play = () => {
        setRequests([...requests, userRequest])
    }

    return (
        <ActionIcon
            variant="filled"
            size="lg"
            pos={"absolute"}
            right={"25px"}
            onClick={play}
        >
            <IconPlayerPlayFilled size={16} stroke={1.5} />
        </ActionIcon>
    )
}
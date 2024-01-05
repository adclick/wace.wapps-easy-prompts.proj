import { Textarea } from "@mantine/core";
import { useUserRequest } from "../../../context/UserRequestContext";
import { Request } from "../../../model/Request";
import { useRequests } from "../../../context/RequestsContext";

export function ChatPromptTextInput() {
    const { requests, setRequests } = useRequests();
    const { userRequest, setUserRequest } = useUserRequest();

    const updateUserRequestText = (value: string) => {
        const newUserRequest = Request.clone(userRequest);
        newUserRequest.id = requests.length;
        newUserRequest.title = value;
        newUserRequest.prompt = value;
        newUserRequest.timestamp = Date.now();
        setUserRequest(newUserRequest);
    }

    const play = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setRequests([...requests, userRequest]);
            updateUserRequestText("");
            e.preventDefault();
        }
    }

    return (
        <Textarea
            placeholder={"write_a_message"}
            autosize
            autoFocus
            minRows={1}
            maxRows={6}
            w={"100%"}
            size={'lg'}
            styles={{
                input: {
                    paddingLeft: "100px",
                    paddingRight: "50px",
                },

            }}
            radius={'xl'}
            value={userRequest.prompt}
            onChange={e => updateUserRequestText(e.target.value)}
            onKeyDown={play}
        />
    )
}
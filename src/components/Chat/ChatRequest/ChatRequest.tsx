import { Avatar, Card, Center, Loader, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Request } from "../../../model/Request";
import { useUser } from "../../../context/UserContext";
import { useAIQuery } from "../../../api/aiApi";

interface ChatRequest {
    request: Request,
}

const getLoader = () => {
    return (
        <Center>
            <Loader size={"xs"} type="bars" />
        </Center>
    );
}

const generateTextResponse = (response: string) => {
    return <Text>{response}</Text>
}

export function ChatRequest({ request }: ChatRequest) {
    const [response, setResponse] = useState(getLoader());
    const [responded, setResponded] = useState(false);
    const { user } = useUser();
    const query = useAIQuery(request, user.id, responded);

    useEffect(() => {
        if (query.data && !responded) {
            setResponse(generateTextResponse(query.data));
            setResponded(true);
        }
        
        if (query.isError && !responded) {
            setResponse(<Text>Something went wrong. Contact support</Text>);
            setResponded(true);
        }
    });

    return (
        <Card p={"md"} shadow="sm">
            <Stack gap={"lg"}>
                <Stack py={"xs"}>
                    <Avatar src={user.picture} size={"sm"} />
                    <Text style={{ whiteSpace: "pre-line" }}>
                        {request.text}
                    </Text>
                </Stack>
                <Stack>
                    <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                    {response}
                </Stack>
            </Stack>
        </Card>
    )
}
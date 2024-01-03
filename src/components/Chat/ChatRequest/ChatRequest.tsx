import { Avatar, Card, Center, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Request } from "../../../model/Request";
import { useUser } from "../../../context/UserContext";
import { useAIQuery } from "../../../api/aiApi";
import favicon from "../../../favicon.svg";

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

const generateImageResponse = (images: string[]) => {
    return <Group>
        {
            images.map(image => {
                return <Image key={image} src={image} />
            })
        }
    </Group>
}

export function ChatRequest({ request }: ChatRequest) {
    const [response, setResponse] = useState(getLoader());
    const [responded, setResponded] = useState(false);
    const { user } = useUser();
    const query = useAIQuery(request, user.id, responded);

    useEffect(() => {
        if (query.data && !responded) {
            switch (request.technology.slug) {
                case 'text-generation':
                    setResponse(generateTextResponse(query.data));
                    break;
                case 'image-generation':
                    setResponse(generateImageResponse(query.data));
                    break;

            }
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
                    <Group>
                        <Avatar src={user.picture} size={"sm"} />
                        <Text>{user.username}</Text>
                    </Group>
                    <Text style={{ whiteSpace: "pre-line" }}>
                        {request.title}
                    </Text>
                </Stack>
                <Stack>
                    <Group>
                        <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                        <Text>EasyPrompts</Text>
                    </Group>
                    {response}
                </Stack>
            </Stack>
        </Card>
    )
}
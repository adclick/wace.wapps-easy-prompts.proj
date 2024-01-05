import { useEffect, useState } from "react";
import { Request } from "../../../model/Request"
import { imageGeneration, textGeneration } from "../../../api/aiApi";
import { Center, Group, Image, Loader, Text } from "@mantine/core";

interface ChatRequestResponse {
    request: Request
}

export function ChatRequestResponse({ request }: ChatRequestResponse) {
    const [response, setResponse] = useState<any>(false);

    const setTextResponse = (text: string) => {
        setResponse(<Text style={{ whiteSpace: "pre-line" }}>{text}</Text>)
    }

    const setImageResponse = (images: string[]) => {
        setResponse(<Group>{images.map(image => <Image key={image} src={image} />)}</Group>)
    }

    const fetch = async () => {
        try {
            switch (request.technology.slug) {
                case 'text-generation': return setTextResponse(await textGeneration(request));
                case 'image-generation': return setImageResponse(await imageGeneration(request));
            }
        } catch (error) {
            console.error(error)
            return setTextResponse("Something went wrong. Please contact support");
        }
    }

    useEffect(() => {
        if (response) return;
        setResponse(<Center><Loader size={"xs"} type="bars" /></Center>);
        fetch();
    });

    return response;
}
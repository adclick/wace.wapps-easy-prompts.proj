import { useEffect, useState } from "react";
import { Request } from "../../../model/Request"
import { imageGeneration, textGeneration } from "../../../api/aiApi";
import { Center, Group, Image, Loader, Text } from "@mantine/core";
import { useRequests } from "../../../context/RequestsContext";

interface ChatRequestResponse {
    request: Request
}

export function ChatRequestResponse({ request }: ChatRequestResponse) {
    const {requests, setRequests} = useRequests();
    const [response, setResponse] = useState<any>(false);

    const setTextResponse = (text: string) => {
        setResponse(<Text style={{ whiteSpace: "pre-line" }}>{text}</Text>)
    }

    const setImageResponse = (images: string[]) => {
        setResponse(<Group>{images.map(image => <Image key={image} src={image} />)}</Group>)
    }

    const updateResponse = (response: any, setStateFn: any) => {
        setStateFn(response);
        const newRequest = Request.clone(request);
        newRequest.response = response;
        requests[request.id] = newRequest;
        setRequests(requests);
    }

    const fetch = async () => {
        try {
            switch (request.technology.slug) {
                case 'text-generation': return updateResponse(await textGeneration(request), setTextResponse);
                case 'image-generation': return updateResponse(await imageGeneration(request), setImageResponse);
            }
        } catch (error) {
            console.error(error)
            return setTextResponse("Something went wrong. Please contact support");
        }
    }

    useEffect(() => {
        if (response) return;
        console.log(request);
        setResponse(<Center><Loader size={"xs"} type="bars" /></Center>);
        fetch();
    });

    return response;
}
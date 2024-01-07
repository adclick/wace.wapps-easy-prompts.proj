import { useEffect, useState } from "react";
import { chat, imageGeneration, textGeneration } from "../../../api/aiApi";
import { Center, Group, Image, Loader, Text } from "@mantine/core";
import { PromptRequest } from "../../../model/PromptRequest";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

interface PromptRequestCardResponse {
    promptRequest: PromptRequest
}

export function PromptRequestCardResponse({ promptRequest }: PromptRequestCardResponse) {
    const {promptsRequests, setPromptsRequests} = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);

    const setTextResponse = (text: string) => {
        setResponse(<Text style={{ whiteSpace: "pre-line" }}>{text}</Text>)
    }

    const setImageResponse = (images: string[]) => {
        setResponse(<Group>{images.map(image => <Image key={image} src={image} />)}</Group>)
    }

    const updateResponse = (response: any, setStateFn: any) => {
        setStateFn(response);
        const newRequest = PromptRequest.clone(promptRequest);
        newRequest.response = response;
        promptsRequests[promptRequest.key] = newRequest;
        setPromptsRequests(promptsRequests);
    }

    const fetch = async () => {
        try {
            switch (promptRequest.technology.slug) {
                case 'text-generation': return updateResponse(await chat(promptsRequests), setTextResponse);
                case 'image-generation': return updateResponse(await imageGeneration(promptRequest), setImageResponse);
            }
        } catch (error) {
            console.error(error);
            return updateResponse("Something went wrong. Please contact support", setTextResponse);
        }
    }

    useEffect(() => {
        if (response) return;
        setResponse(<Center><Loader size={"xs"} type="bars" /></Center>);
        fetch();
    });

    return response;
}
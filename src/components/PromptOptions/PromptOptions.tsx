import { Select } from "@mantine/core"
import { useEffect, useState } from "react"

// const options = {
//     aiResponseTypes: [
//         {
//             name: "Text Generation",
//             slug: "text-generation",
//             default: true,
//             defaultProvider: "open-ai"
//         },
//         {
//             name: "Image Generation",
//             default: false,
//             defaultProvider: "google"
//         },
//         {
//             name: "Text to Speech",
//             default: false,
//             defaultProvider: "amazon"
//         }
//     ],
//     providers: [
//         {
//             name: "OpenAI",
//             slug: "open-ai"
//         },
//         {
//             name: "Google"
//         }
//     ],
//     aiResponseImageSize: [],
//     promptModifiers: []
// }

interface ResponseType {
    name: string,
    slug: string,
    default: boolean,
    defaultProvider: string
}

interface Provider {
    name: string,
    slug: string,
    default: boolean
}

interface ResponseImageSize {
    name: string,
    slug: string
}

interface Modifier {
    name: string,
    slug: string,
    content: string
}

export function PromptOptions() {
    const [responseTypes, setResponseTypes] = useState<ResponseType[]>([]);
    const [responseType, setResponseType] = useState("");

    const [providers, setProviders] = useState<Provider[]>([]);
    const [responseImageSizes, setResponseImageSizes] = useState<ResponseImageSize[]>([]);
    const [modifiers, setModifiers] = useState<Modifier[]>([]);



    useEffect(() => {

    }, []);

    return (
        <>
            {/* <Select
                placeholder="Response Type"
                data={selectBoxPromptTypes}
                value={responseType}
                onChange={handlePromptTypesOnChange}
            /> */}
        </>
    )
}
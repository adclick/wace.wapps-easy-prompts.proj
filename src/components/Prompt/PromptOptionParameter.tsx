import { UserPromptOptions } from "../../model/UserPromptOptions";
import { PromptOptionImageResolution } from "./PromptOptionImageResolution";
import { PromptOptionNumImages } from "./PromptOptionNumImages";
import { Parameter } from "../../model/Parameter";

interface PromptOptionParameter {
    type: string,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    parameter: Parameter
}

export function PromptOptionParameter({
    type,
    userPromptOptions,
    setUserPromptOptions,
    parameter
}: PromptOptionParameter) {
    switch (type) {
        case "image-resolution":
            return <PromptOptionImageResolution
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        case "num-images":
            return <PromptOptionNumImages
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        default:
            return <></>;
    }
}
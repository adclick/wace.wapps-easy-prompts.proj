import { UserPromptOptions } from "../../model/UserPromptOptions";
import { ImageResolutionOption } from "./ImageResolutionOption";
import { NumImagesOption } from "./NumImagesOption";
import { Parameter } from "../../model/Parameter";

interface ParameterOption {
    type: string,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    parameter: Parameter
}

export function ParameterOption({
    type,
    userPromptOptions,
    setUserPromptOptions,
    parameter
}: ParameterOption) {
    switch (type) {
        case "image-resolution":
            return <ImageResolutionOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        case "num-images":
            return <NumImagesOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        default:
            return <></>;
    }
}
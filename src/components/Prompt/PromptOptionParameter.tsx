import { UserPromptOptions } from "../../model/UserPromptOptions";
import { ImageResolutionOption } from "../Options/ImageResolutionOption/ImageResolutionOption";
import { NumImagesOption } from "../Options/NumImagesOption/NumImagesOption";
import { Parameter } from "../../model/Parameter";
import { LanguagesOption } from "../Options/LanguagesOption/LanguagesOption";

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
        case "source-language":
        case "target-language":
            return <LanguagesOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        default:
            return <></>;
    }
}
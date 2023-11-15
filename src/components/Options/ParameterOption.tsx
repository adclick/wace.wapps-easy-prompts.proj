import { CharactersLimitOption } from "./CharactersLimitOption";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ImageResolutionsOption } from "./ImageResolutionsOption";
import { MaxImageOption } from "./MaxImagesOption";
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
        case "characters-limit":
            return <CharactersLimitOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />;
        case "image-resolutions":
            return <ImageResolutionsOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        case "max-images":
            return <MaxImageOption
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        default:
            return <></>;
    }
}
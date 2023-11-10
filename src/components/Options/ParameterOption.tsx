import { CharactersLimitParameter } from "../Parameters/CharactersLimitParameter";
import { Parameter } from "../../model/PromptOptions";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ImageResolutionsParameter } from "../Parameters/ImageResolutionsParameter";
import { MaxImageOption } from "./MaxImagesOption";

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
            return <CharactersLimitParameter
                parameter={parameter}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />;
        case "image-resolutions":
            return <ImageResolutionsParameter
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
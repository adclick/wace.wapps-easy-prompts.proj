import { CharactersLimitParameter } from "../Parameters/CharactersLimitParameter";
import { Parameter } from "../../model/PromptOptions";


interface ParameterOption {
    type: string,
    args: Parameter
}

export function ParameterOption({ type, args }: ParameterOption) {
    switch (type) {
        case "characters-limit":
            return <CharactersLimitParameter args={args} />;
        default:
            return "";
    }
}
import { SuggestionsPanel } from "../Panels/SuggestionsPanel";
import { UsedPrompt } from "../../model/UsedPrompt";

interface Navbar {
    usedPrompts: UsedPrompt[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any
}

export function Navbar({
    usedPrompts,
    userPrompt,
    setUserPrompt,
    navbarToggle
}: Navbar) {
    return (
        <SuggestionsPanel
            usedPrompts={usedPrompts}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            navbarToggle={navbarToggle}
        />
    )
}
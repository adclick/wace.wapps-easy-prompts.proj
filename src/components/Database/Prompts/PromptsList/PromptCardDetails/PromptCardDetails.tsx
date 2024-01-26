import { Prompt } from "../../../../../model/Prompt";
import { usePromptQuery } from "../../../../../api/promptsApi";
import { useUser } from "../../../../../context/UserContext";
import { DatabaseCardDetails } from "../../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { Label } from "../../../../../model/SelectedDatabaseType";

interface PromptCardDetails {
    opened: boolean,
    handle: any,
    prompt: Prompt,
}

export function PromptCardDetails({
    opened,
    handle,
    prompt,
}: PromptCardDetails) {
    const { user } = useUser();
    const enabled = user.username === prompt.user.username && opened

    const itemQuery = usePromptQuery(prompt.id, enabled);
    
    return <DatabaseCardDetails 
        opened={opened}
        handle={handle}
        item={prompt}
        itemQuery={itemQuery}
        hasContent={true}
        hasModifiers={true}
        hasTemplates={true}
        typeLabel={Label.Prompt}
    />
}
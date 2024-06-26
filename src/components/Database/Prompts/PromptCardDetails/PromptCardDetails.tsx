import { Prompt } from "../../../../models/Prompt";
import { usePromptQuery } from "../../../../api/promptsApi";
import { useUser } from "../../../../context/UserContext";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { Label } from "../../../../models/SelectedDatabaseType";

interface PromptCardDetails {
    opened: boolean,
    handle: any,
    prompt: Prompt,
    deleteMutation: any
}

export function PromptCardDetails({
    opened,
    handle,
    prompt,
    deleteMutation
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
        deleteMutation={deleteMutation}
    />
}
import { Prompt } from "../../../../models/Prompt";
import { usePromptQuery } from "../../../../api/promptsApi";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { Label } from "../../../../models/SelectedDatabaseType";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

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
    const [user] = useStore(useShallow(state => [state.user]));
    const enabled = user.username === prompt.user.username && opened

    const itemQuery = usePromptQuery(user, prompt.id, enabled);
    
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
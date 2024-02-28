import { Modifier } from "../../../../models/Modifier";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { useModifierQuery } from "../../../../api/modifiersApi";
import { Label } from "../../../../models/SelectedDatabaseType";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface ModifierCardDetails {
    opened: boolean,
    handle: any,
    modifier: Modifier,
    deleteMutation: any
}

export function ModifierCardDetails({
    opened,
    handle,
    modifier,
    deleteMutation
}: ModifierCardDetails) {
    const [user] = useStore(useShallow(state => [state.user]));
    const enabled = user.username === modifier.user.username && opened

    const itemQuery = useModifierQuery(modifier.uuid, enabled);

    return <DatabaseCardDetails
        opened={opened}
        handle={handle}
        item={modifier}
        itemQuery={itemQuery}
        hasContent={true}
        hasModifiers={false}
        hasTemplates={false}
        typeLabel={Label.Modifier}
        deleteMutation={deleteMutation}
    />
}
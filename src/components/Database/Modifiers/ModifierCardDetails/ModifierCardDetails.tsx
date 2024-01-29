import { Modifier } from "../../../../model/Modifier";
import { useUser } from "../../../../context/UserContext";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { useModifierQuery } from "../../../../api/modifiersApi";
import { Label } from "../../../../model/SelectedDatabaseType";

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
    const { user } = useUser();
    const enabled = user.username === modifier.user.username && opened

    const itemQuery = useModifierQuery(modifier.id, enabled);

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
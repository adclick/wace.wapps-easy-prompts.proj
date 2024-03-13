import { Template } from "../../../../models/Template";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { useTemplateQuery } from "../../../../api/templatesApi";
import { Label } from "../../../../models/SelectedDatabaseType";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface TemplateCardDetails {
    opened: boolean,
    handle: any,
    template: Template,
    deleteMutation: any,
    openEdit: any,
    copyURL: any
}

export function TemplateCardDetails({
    opened,
    handle,
    template,
    deleteMutation,
    openEdit,
    copyURL
}: TemplateCardDetails) {
    const [user] = useStore(useShallow(state => [state.user]));
    const enabled = user.username === template.user.username && opened

    const itemQuery = useTemplateQuery(template.uuid, enabled);

    return <DatabaseCardDetails
        opened={opened}
        handle={handle}
        item={template}
        itemQuery={itemQuery}
        hasContent={false}
        hasModifiers={true}
        hasTemplates={false}
        typeLabel={Label.Tempalate}
        openEdit={openEdit}
        copyURL={copyURL}
        deleteMutation={deleteMutation}
    />
}
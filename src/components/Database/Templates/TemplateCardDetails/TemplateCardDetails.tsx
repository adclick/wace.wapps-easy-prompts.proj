import { Template } from "../../../../models/Template";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";
import { useTemplateQuery } from "../../../../api/templatesApi";
import { useUser } from "../../../../context/UserContext";
import { Label } from "../../../../models/SelectedDatabaseType";

interface TemplateCardDetails {
    opened: boolean,
    handle: any,
    template: Template,
    deleteMutation: any
}

export function TemplateCardDetails({
    opened,
    handle,
    template,
    deleteMutation
}: TemplateCardDetails) {
    const { user } = useUser();
    const enabled = user.username === template.user.username && opened

    const itemQuery = useTemplateQuery(template.id, enabled);

    return <DatabaseCardDetails
        opened={opened}
        handle={handle}
        item={template}
        itemQuery={itemQuery}
        hasContent={false}
        hasModifiers={true}
        hasTemplates={false}
        typeLabel={Label.Tempalate}
        deleteMutation={deleteMutation}
    />
}
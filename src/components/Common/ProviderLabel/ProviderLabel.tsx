import { Badge } from "@mantine/core";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";

interface ProviderLabel {
    technology: Technology,
    provider: Provider|undefined,
    size: string
}

export function ProviderLabel({ technology, provider, size }: ProviderLabel) {
    return (
        <Badge size={size} variant="dot">
            {technology.name}{provider && ` | ${provider.model_name}`}
        </Badge>
    )
}
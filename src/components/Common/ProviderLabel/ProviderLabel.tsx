import { Badge } from "@mantine/core";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";

interface ProviderLabel {
    technology: Technology,
    provider: Provider
}

export function ProviderLabel({ technology, provider }: ProviderLabel) {
    return (
        <Badge size="xs" variant="dot">
            {technology.name} | {provider.model_name}
        </Badge>
    )
}
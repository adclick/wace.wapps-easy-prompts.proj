import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { Provider } from "../../model/Provider";
import { Technology } from "../../model/Technology";
import { Badge, Text } from "@mantine/core";

interface SelectedOptionsWidget {
    technology: Technology,
    provider: Provider,
    parameters: Parameter[],
    modifiers: Modifier[]
}

export function SelectedOptionsWidget({
    technology,
    provider,
    parameters,
    modifiers
}: SelectedOptionsWidget) {
    return (
        // <Badge size="sm" variant="outline">
        //     {technology.name} |  {provider.name}
        // </Badge>

        <Text size="xs" >
            {technology.name} |  {provider.name}
        </Text>
    )
}
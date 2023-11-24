import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { Provider } from "../../model/Provider";
import { Technology } from "../../model/Technology";
import { Badge, Chip, Popover, Text } from "@mantine/core";

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
        modifiers.length > 0
            ? <Popover>
                <Popover.Target>
                    <Text size="xs">
                        {technology.name} |  {provider.name}
                    </Text>

                </Popover.Target>
                <Popover.Dropdown>
                    {
                        modifiers.map(m => {
                            return (
                                <Chip size="xs" readOnly checked variant="outline" key={m.slug}>{m.name}</Chip>
                            )
                        })
                    }
                </Popover.Dropdown>
            </Popover>
            : <Text size="xs">
                {technology.name} |  {provider.name}
            </Text>

    )
}
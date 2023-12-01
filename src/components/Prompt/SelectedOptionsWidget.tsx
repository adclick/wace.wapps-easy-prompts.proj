import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { Provider } from "../../model/Provider";
import { Technology } from "../../model/Technology";
import { Badge, Box, Button, Card, Chip, Group, Popover, PopoverDropdown, Select, Text } from "@mantine/core";

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
        <Box w={"auto"} maw={"90%"}>
            <Badge variant="transparent" size="xs">
                {technology.name} |  {provider.name}
            </Badge>
        </Box>

    )
}
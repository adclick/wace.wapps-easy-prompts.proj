import { Box, Divider, Group, Text, rem } from "@mantine/core";
import { Technology } from "../../../models/Technology";
import { Provider } from "../../../models/Provider";
import { Template } from "../../../models/Template";
import { Modifier } from "../../../models/Modifier";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";

interface ProviderLabel {
    technology: Technology,
    provider: Provider | undefined,
    templates: Template[],
    modifiers: Modifier[],
    size: string
}

export function ProviderLabel({ technology, provider, templates, modifiers, size }: ProviderLabel) {

    let padding = 5;
    let textSize = rem(14);
    let iconSize = 16;
    let iconTextSize = rem(14);
    let fw = 600;
    let gap: string | number = "xs";
    let maw = 150;

    switch (size) {
        case 'sm':
            padding = 3;
            textSize = rem(10);
            iconSize = 14;
            iconTextSize = rem(10);
            break;
        case 'xs':
            padding = 2;
            textSize = rem(9);
            iconSize = 12;
            iconTextSize = rem(9);
            gap = 6;
            break;

    }

    return (
        <Group p={padding} gap={gap} justify="space-between" wrap="wrap">
            <Box maw={maw}>
                <Text truncate fw={fw} size={textSize}>{technology.name}</Text>
            </Box>
            {
                provider &&
                <>
                    <Divider orientation="vertical" />
                    <Box maw={maw}>
                        <Text truncate fw={fw} size={textSize}>{provider.model_name}</Text>
                    </Box>
                </>
            }
            {
                templates.length > 0 && size !== "xs" &&
                <>
                    <Divider orientation="vertical" />
                    <Group gap={4}>
                        <IconTemplate size={iconSize} />
                        <Text fw={fw} size={iconTextSize}>{templates.length}</Text>
                    </Group>
                </>
            }
            {
                modifiers.length > 0 && size !== "xs" &&
                <>
                    <Divider orientation="vertical" />
                    <Group gap={4}>
                        <IconSparkles size={iconSize} />
                        <Text fw={fw} size={iconTextSize}>{modifiers.length}</Text>
                    </Group>
                </>
            }
        </Group>
    )
}
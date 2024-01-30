import { Divider, Group, Text, rem } from "@mantine/core";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";
import { Template } from "../../../model/Template";
import { Modifier } from "../../../model/Modifier";
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
    let gap: string|number = "xs";

    switch (size) {
        case 'sm':
            padding = 3;
            textSize = rem(12);
            iconSize = 14;
            iconTextSize = rem(12);
            break;
        case 'xs':
            padding = 0;
            textSize = rem(8);
            iconSize = 12;
            iconTextSize = rem(10);
            gap = 2;
            break;

    }

    return (
        <Group p={padding} gap={gap} justify="space-between" wrap="wrap">
            <Text fw={fw} size={textSize}>{technology.name}</Text>
            {
                provider &&
                <>
                    <Divider orientation="vertical" />
                    <Text fw={fw} size={textSize}>{provider.model_name}</Text>
                </>
            }
            {
                templates.length > 0 &&
                <>
                    <Divider orientation="vertical" />
                    <Group gap={4}>
                        <IconTemplate size={iconSize} />
                        <Text fw={fw} size={iconTextSize}>{templates.length}</Text>
                    </Group>
                </>
            }
            {
                modifiers.length > 0 &&
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
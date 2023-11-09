import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

interface LanguageOption {
    languages: string[],
    defaultLanguage: string,
    currentLanguage: string,
    setLanguage: any
}

export function LanguageOption({
    languages,
    defaultLanguage,
    currentLanguage,
    setLanguage
}: LanguageOption) {
    return (
        <Accordion.Item key={"language"} value="language">
            <Accordion.Control icon={<IconLanguage style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Language</Title>
                    <Text size="xs">{currentLanguage}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    variant="unstyled"
                    data={languages}
                    defaultValue={defaultLanguage}
                    value={currentLanguage}
                    onChange={setLanguage}
                    my={"xs"}
                    size="md"
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}
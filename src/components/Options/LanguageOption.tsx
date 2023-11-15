import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useState } from "react";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Language } from "../../model/Language";

interface LanguageOption {
    setLanguage: any
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function LanguageOption({
    setLanguage,
    userPromptOptions,
    setUserPromptOptions
}: LanguageOption) {
    const [value, setValue] = useState("PT");

    const handleOnChange = (value: string) => {
        const newLanguage = new Language();
        newLanguage.setCode(value);

        setValue(value);
        setLanguage(newLanguage);

        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setLanguage(value);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Accordion.Item key={"language"} value="language">
            <Accordion.Control py={"xs"} icon={<IconLanguage style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Language</Title>
                    <Text size="xs">{value}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    variant="unstyled"
                    data={Language.getAll()}
                    defaultValue={new Language().code}
                    value={value}
                    onChange={handleOnChange}
                    my={"xs"}
                    size="md"
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}
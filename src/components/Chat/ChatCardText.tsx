import { Text } from "@mantine/core";

interface ChatCardText {
    text: string
}

export function ChatCardText({ text }: ChatCardText) {
    return (
        <Text size="md" style={{ whiteSpace: "pre-line" }}>
            {
                typeof text === "string"
                    ? text.trim()
                    : "Error"
            }
        </Text>
    )
}
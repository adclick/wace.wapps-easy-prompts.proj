import { Text } from "@mantine/core";

interface ThreadResponseTextWidget {
    text: string
}

export function ThreadResponseTextWidget({ text }: ThreadResponseTextWidget) {
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
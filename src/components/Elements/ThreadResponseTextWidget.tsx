import { Text } from "@mantine/core";

interface ThreadResponseTextWidget {
    text: string
}

export function ThreadResponseTextWidget({ text }: ThreadResponseTextWidget) {
    return (
        <Text size="sm" style={{ whiteSpace: "pre-line" }}>
            {
                text !== undefined 
                    ? text.trim()
                    : "Error"
            }
        </Text>
    )
}
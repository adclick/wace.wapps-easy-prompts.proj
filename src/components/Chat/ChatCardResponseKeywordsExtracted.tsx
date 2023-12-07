import { List } from "@mantine/core"

interface ChatCardKeywordsExtracted {
    keywords: string[]
}

export function ChatCardKeywordsExtracted({ keywords }: ChatCardKeywordsExtracted) {
    return (
        <List type="ordered">
            {
                keywords.map(keyword => {
                    return (
                        <List.Item>
                            {keyword}
                        </List.Item>
                    )
                })
            }
        </List>
    )
}
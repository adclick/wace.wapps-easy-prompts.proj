import { Image, SimpleGrid } from "@mantine/core"

interface ChatCardImage {
    images: string[]
}

export function ChatCardImage({ images }: ChatCardImage) {
    return (
        <SimpleGrid cols={{base: 1, sm: 2}}>
            {
                images.map(image => {
                    return (
                        <Image
                            key={image}
                            src={image}
                        />
                    )
                })
            }
        </SimpleGrid>
    )
}
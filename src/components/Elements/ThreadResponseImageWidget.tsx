import { Image, SimpleGrid } from "@mantine/core"

interface ThreadResponseImageWidget {
    images: string[]
}

export function ThreadResponseImageWidget({ images }: ThreadResponseImageWidget) {
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
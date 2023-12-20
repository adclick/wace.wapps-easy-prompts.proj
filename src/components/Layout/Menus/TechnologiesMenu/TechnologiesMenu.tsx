import { ActionIcon, Menu, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconClipboardText, IconHeadphones, IconLanguage, IconLayersSubtract, IconListSearch, IconPencil, IconPhoto } from "@tabler/icons-react";
import { Technology } from "../../../../model/Technology";

interface TechnologiesMenu {
    technology: Technology,
    handleOnChangeTechnology: any
}

export function TechnologiesMenu({
    technology,
    handleOnChangeTechnology

}: TechnologiesMenu) {
    return (
        <Menu shadow="md" position='bottom-start'>
            <Menu.Target>
                <Tooltip label="Switch mode">

                    <ActionIcon
                        variant="subtle"
                        aria-label="Settings"
                        size="lg"
                        pos={"absolute"}
                        left={"30px"}
                        styles={{
                            root: {
                                zIndex: "1"
                            }
                        }}
                    >
                        {
                            Technology.getIcon(technology.slug, "70%")
                        }
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => handleOnChangeTechnology('text-generation')}
                    rightSection={
                        technology.slug === "text-generation" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                >
                    Text Generation
                </Menu.Item>
                <Menu.Item
                    onClick={() => handleOnChangeTechnology('image-generation')}
                    rightSection={
                        technology.slug === "image-generation" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}
                >
                    Image Generation
                </Menu.Item>
                <Menu.Item
                    onClick={() => handleOnChangeTechnology('keywords-extraction')}
                    rightSection={
                        technology.slug === "keywords-extraction" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconListSearch style={{ width: rem(14), height: rem(14) }} />}
                >
                    Keywords Extraction
                </Menu.Item>
                <Menu.Item
                    onClick={() => handleOnChangeTechnology('translation')}
                    rightSection={
                        technology.slug === "translation" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconLanguage style={{ width: rem(14), height: rem(14) }} />}
                >
                    Translation
                </Menu.Item>
                <Menu.Item
                    disabled
                    rightSection={
                        technology.slug === "topic-extraction" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconLayersSubtract style={{ width: rem(14), height: rem(14) }} />}
                >
                    Topic Extraction
                </Menu.Item>
                <Menu.Item
                    disabled
                    rightSection={
                        technology.slug === "summarization" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconClipboardText style={{ width: rem(14), height: rem(14) }} />}
                >
                    Summarize
                </Menu.Item>
                <Menu.Item
                    disabled
                    rightSection={
                        technology.slug === "text-to-speech" &&
                        <IconCheck style={{ width: rem(14), height: rem(14) }} />
                    }
                    leftSection={<IconHeadphones style={{ width: rem(14), height: rem(14) }} />}
                >
                    Text to Speech
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
import { ActionIcon, Box, Center, Group, SegmentedControl, Stack, Text, Tooltip } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";
import { ThreadsScrollToBottom } from "../../Threads/ThreadsScrollToBottom/ThreadsScrollToBottom";
import { IconAdjustmentsHorizontal, IconEye } from "@tabler/icons-react";
import iconsUtils from "../../../utils/iconsUtils";

export function PromptContainer() {
    const { selectedModifiers } = useSelectedModifiers();

    return (
        <Stack
            gap={"xs"}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            
            <Group justify="center" >
                <SegmentedControl
                    py={0}
                    size="sm"
                    color="blue"
                    defaultValue="text"
                    fullWidth
                    data={[
                        {
                            label: (
                                <Tooltip label="Text">
                                    <Group justify="center" wrap="nowrap" gap={"xs"} px={"md"}>
                                        {iconsUtils.getTechnologyIcon('text-generation', 16)}
                                    </Group>
                                </Tooltip>
                            ),
                            value: "text"
                        },
                        {
                            label: (
                                <Tooltip label="Image">
                                    <Group justify="center" wrap="nowrap" gap={"xs"} px={"md"}>
                                        {iconsUtils.getTechnologyIcon('image-generation', 16)}
                                    </Group>
                                </Tooltip>
                            ),
                            value: "image"
                        },
                        {
                            label: (
                                <Tooltip label="Audio">
                                    <Group justify="center" wrap="nowrap" gap={"xs"} px={"md"}>
                                        {iconsUtils.getTechnologyIcon('audio-generation', 16)}
                                    </Group>
                                </Tooltip>
                            ),
                            value: "audio",
                            disabled: true
                        },
                        {
                            label: (
                                <Tooltip label="Video">
                                    <Group justify="center" wrap="nowrap" gap={"xs"} px={"md"}>
                                        {iconsUtils.getTechnologyIcon('video-generation', 16)}
                                    </Group>
                                </Tooltip>
                            ),
                            value: "video",
                            disabled: true
                        },
                    ]}
                />
                <PromptOptionsMenu />
            </Group>
            <ThreadsScrollToBottom />
            <Group w={"100%"} >
                <PromptTextInput />
                <PromptModifiersList />
                {/* <PromptOptionsMenu /> */}
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}
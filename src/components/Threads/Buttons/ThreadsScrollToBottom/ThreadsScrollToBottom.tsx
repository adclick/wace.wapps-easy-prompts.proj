import { ActionIcon, Affix, Box, Button, Group, Transition } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { IconArrowDown } from "@tabler/icons-react";

export function ThreadsScrollToBottom() {
    const [scroll, scrollTo] = useWindowScroll();

    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    return (
        <Group justify="center" pos={"relative"} w={"100%"}>
                <Transition
                    transition="slide-up" mounted={scroll.y < maxHeight}>
                    {(transitionStyles) => (
                        <Group justify="center" pos={"absolute"} bottom={200}>
                            <ActionIcon
                                hiddenFrom="sm"
                                variant="subtle"
                                style={transitionStyles}
                                onClick={() => scrollTo({ y: maxHeight })}
                                size="xs"
                            >
                                <IconArrowDown size={16} />
                            </ActionIcon>
                            <Button
                                visibleFrom="sm"
                                variant="subtle"
                                leftSection={<IconArrowDown size={16} />}
                                style={transitionStyles}
                                onClick={() => scrollTo({ y: maxHeight })}
                                size="xs"
                            >
                                Scroll to bottom
                            </Button>
                        </Group>
                    )}
                </Transition>
        </Group>
    )
}
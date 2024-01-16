import { ActionIcon, Affix, Box, Button, Transition } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { IconArrowDown } from "@tabler/icons-react";

export function ThreadsScrollToBottom() {
    const [scroll, scrollTo] = useWindowScroll();

    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    return (
        <Box>
            <Affix position={{ bottom: 78, right: 20 }}>
                <Transition
                    transition="slide-up" mounted={scroll.y < maxHeight}>
                    {(transitionStyles) => (
                        <Box>
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
                        </Box>
                    )}
                </Transition>
            </Affix>
        </Box>
    )
}
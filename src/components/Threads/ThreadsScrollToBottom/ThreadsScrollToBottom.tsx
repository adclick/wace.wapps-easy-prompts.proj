import { Affix, Button, Transition } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { IconArrowDown } from "@tabler/icons-react";

export function ThreadsScrollToBottom() {
    const [scroll, scrollTo] = useWindowScroll();

    const maxHeight =  999999;

    return (
        <Affix
            position={{ bottom: 78, right: 600 }}
        >
            <Transition
                transition="slide-up" mounted={scroll.y < maxHeight}>
                {(transitionStyles) => (
                    <Button
                        leftSection={<IconArrowDown size={16} />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: maxHeight })}
                        size="xs"
                    >
                        Scroll to bottom
                    </Button>
                )}
            </Transition>
        </Affix>
    )
}
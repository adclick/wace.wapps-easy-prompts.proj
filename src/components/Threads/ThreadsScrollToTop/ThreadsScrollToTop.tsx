import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export function ThreadsScrollToTop() {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix
            position={{ bottom: 78, right: 20 }}>
            <Transition
                transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <Button
                        variant="subtle"
                        leftSection={<IconArrowUp size={16} />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                        size="xs"
                    >
                        Scroll to top
                    </Button>
                )}
            </Transition>
        </Affix>
    )
}
import { Burger, Group, Title } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { MouseEventHandler } from "react";

interface Props {
    opened: boolean,
    toggle: MouseEventHandler<HTMLButtonElement>
}

export function Header({opened, toggle}: Props) {
    return (
        <Group h={"100%"} px={"md"} justify="space-between">
            <Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Title order={2}>
                    EasyPrompts
                </Title>
            </Group>
            <ColorSchemeToggle />
        </Group>
    )
}
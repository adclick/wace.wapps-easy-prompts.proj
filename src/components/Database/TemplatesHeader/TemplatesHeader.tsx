import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { NewTemplateModal } from "../NewTemplateModal/NewTemplateModal";

interface TemplatesHeader {
    navbarOpened: boolean,
    navbarHandle: any,
    filtersHandle: any
    filtersQuery: any
}

export function TemplatesHeader({
    navbarOpened,
    navbarHandle,
    filtersHandle,
    filtersQuery
}: TemplatesHeader) {
    const [newTemplateModalOpened, newTemplateModalHandle] = useDisclosure(false);

    return (
        <>
            <NewTemplateModal opened={newTemplateModalOpened} handle={newTemplateModalHandle} />
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group>
                    <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                    <DatabaseMenu />
                </Group>
                <Group gap={"xs"}>
                    <Tooltip label="Filters">
                        <ActionIcon onClick={filtersHandle.open} size={"lg"} variant='subtle'>
                            <IconFilter size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </>
    )
}
import { useDisclosure } from "@mantine/hooks";
import { useModifiersFiltersQuery } from "../../../api/modifiersApi";
import { usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { ModifiersHeader } from "../ModifiersHeader/ModifiersHeader";
import { PromptsHeader } from "../PromptsHeader/PromptsHeader";
import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { useModifiersSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { usePromptsSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { TemplatesHeader } from "../TemplatesHeader/TemplatesHeader";
import { useTemplatesFiltersQuery } from "../../../api/templatesApi";
import { useTemplatesSelectedFilters } from "../../../context/TemplatesSelectedFiltersContext";
import { TemplatesSelectedFilters } from "../../../model/TemplatesSelectedFilters";

interface DatabaseHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function DatabaseHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: DatabaseHeader) {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const promptsFiltersQuery = usePromptsFiltersQuery(user.id);
    const modifiersFiltersQuery = useModifiersFiltersQuery(user.id);
    const templatesFiltersQuery = useTemplatesFiltersQuery(user.id);
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const { modifiersSelectedFilters, setModifiersSelectedFilters } = useModifiersSelectedFilters();
    const { templatesSelectedFilters, setTemplatesSelectedFilters } = useTemplatesSelectedFilters();
    const { promptsSelectedFilters, setPromptsSelectedFilters } = usePromptsSelectedFilters();

    // Init selectedFilters
    useEffect(() => {
        if (promptsSelectedFilters.isEmpty && promptsFiltersQuery.data) {
            const newSelectedFilters = PromptsSelectedFilters.buildFromQuery(promptsFiltersQuery.data);
            setPromptsSelectedFilters(newSelectedFilters);
        }
    }, [promptsSelectedFilters, promptsFiltersQuery])

    // Init selectedFilters
    useEffect(() => {
        if (modifiersSelectedFilters.isEmpty && modifiersFiltersQuery.data) {
            const newSelectedFilters = ModifiersSelectedFilters.buildFromQuery(modifiersFiltersQuery.data);
            setModifiersSelectedFilters(newSelectedFilters);
        }
    }, [modifiersSelectedFilters, modifiersFiltersQuery])

    // Init selectedFilters
    useEffect(() => {
        if (templatesSelectedFilters.isEmpty && templatesFiltersQuery.data) {
            const newSelectedFilters = TemplatesSelectedFilters.buildFromQuery(templatesFiltersQuery.data);
            setTemplatesSelectedFilters(newSelectedFilters);
        }
    }, [templatesSelectedFilters, templatesFiltersQuery])

    let header = <></>;
    switch (selectedDatabaseType.type) {
        case Type.MODIFIER:
            header = <ModifiersHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
                filtersOpened={filtersOpened}
            />
            break;
        case Type.TEMPLATE:
            header = <TemplatesHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
                filtersOpened={filtersOpened}
            />
            break;
        case Type.PROMPT:
            header = <PromptsHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
                filtersOpened={filtersOpened}
            />
            break;
        default:
            header = <></>
    }

    return (
        <Stack gap={"lg"} pb={"xl"}>
            {header}
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                promptsFiltersQuery={promptsFiltersQuery}
                modifiersFiltersQuery={modifiersFiltersQuery}
                templatesFiltersQuery={templatesFiltersQuery}
            />
        </Stack>
    )
}
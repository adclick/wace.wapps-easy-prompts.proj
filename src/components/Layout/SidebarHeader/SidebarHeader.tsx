import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { Button, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import SidebarHamburgerSwitcher from "../../../features/SidebarHamburgerSwitcher/SidebarHamburgerSwitcher";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import SidebarCollapseSwitcher from "../../../features/SidebarCollapseSwitcher/SidebarCollapseSwitcher";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";
import { CreateUserItemSection } from "../../../features/CreateUserItemSection/CreateUserItemSection";
import { DesktopContainer, FlexRow, MobileContainer } from "../../UI/Layout";
import { BooleanHandle } from "../../../types";
import { FlexAlign, Size } from "../../../enums";
import UserDatabaseTypeSwitchContainer from "../../../features/UserDatabaseTypeSwitchContainer/UserDatabaseTypeSwitchContainer";
import FlexWrap from "../../../enums/FlexWrap";
import { iconChevronDown } from "../../../utils/iconsUtils";

interface SidebarHeaderProps {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: BooleanHandle,
    navbarDesktopHandle: BooleanHandle,
}

const SidebarHeader: FC<SidebarHeaderProps> = ({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: SidebarHeaderProps) => {
    const [databaseTypeOpened, databaseTypeHandle] = useDisclosure(false);
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const [createItemOpened, createItemHandle] = useDisclosure(false);

    const [
        selectedPrivateDatabaseType,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.selectedPrivateDatabaseType,
        state.setSelectedPrivateDatabaseType,

    ]));

    return (
        <Stack gap={"lg"} pb={"xl"}>
            <Group justify='space-between' pt={"xs"}>
                <FlexRow>
                    <MobileContainer>
                        <SidebarHamburgerSwitcher
                            navbarOpened={navbarMobileOpened}
                            navbarHandle={navbarMobileHandle}
                        />
                    </MobileContainer>
                    <Button
                        rightSection={iconChevronDown("xs", 3)}
                        color="--mantine-color-text"
                        variant="transparent"
                        size="compact-lg"
                        px={0}
                        onClick={databaseTypeHandle.toggle}
                    >
                        My {selectedPrivateDatabaseType.labelPlural}
                    </Button>
                </FlexRow>
                <FlexRow gap={Size.xs}>
                    <DatabaseAddIcon
                        onClick={createItemHandle.toggle}
                        createItemOpened={createItemOpened}
                    />
                    <FiltersToggleIcon
                        onClick={filtersHandle.toggle}
                        filtersOpened={filtersOpened}
                    />
                    <DesktopContainer>
                        <SidebarCollapseSwitcher
                            navbarOpened={navbarDesktopOpened}
                            navbarToggle={navbarDesktopHandle.toggle}
                        />
                    </DesktopContainer>
                </FlexRow>
            </Group>
            <UserDatabaseTypeSwitchContainer
                opened={databaseTypeOpened}
                handle={databaseTypeHandle}
            />
            <CreateUserItemSection
                opened={createItemOpened}
                handle={createItemHandle}
            />
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
            />
        </Stack>
    )
}

export default SidebarHeader;
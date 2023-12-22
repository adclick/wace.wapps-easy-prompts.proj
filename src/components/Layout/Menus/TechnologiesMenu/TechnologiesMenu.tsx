import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconAlertTriangle, IconPencil, IconPhoto } from "@tabler/icons-react";
import { useFiltersQuery } from "../../../../api/filtersApi";
import { useUser } from "../../../../context/UserContext";
import { useDefaultTechnologyQuery } from "../../../../api/technologiesApi";

interface TechnologiesMenu {
}

export function TechnologiesMenu({

}: TechnologiesMenu) {
    const { user } = useUser();
    const { data, isLoading, isError, isSuccess } = useFiltersQuery(user.id);
    const defaultTechnologyQuery = useDefaultTechnologyQuery();

    
    return (
        <Menu shadow="md" position='top-start'>
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
                                zIndex: "99"
                            }
                        }}
                    >
                        {
                            isError && <IconAlertTriangle />
                        }
                        {
                            isLoading || isSuccess && <IconPencil />
                        }
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            {
                data !== undefined &&
                <Menu.Dropdown>
                    {
                        data.technologies.map((t: { id: number, name: string, slug: string }) => {
                            return (
                                <Menu.Item key={t.id}>
                                    {t.name}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.Dropdown>
            }
        </Menu>
    )

}
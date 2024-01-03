import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { useUserRequest } from "../../../context/UserRequestContext";
import { Technology } from "../../../model/Technology";
import { useDefaultTechnologyQuery, useTechnologiesQuery } from "../../../api/technologiesApi";
import { useEffect } from "react";
import { Request } from "../../../model/Request";

export function ChatPromptTechnologiesMenu() {
    const { userRequest, setUserRequest } = useUserRequest();
    const technologiesQuery = useTechnologiesQuery();
    const defaultTechnologyQuery = useDefaultTechnologyQuery();

    // Update UserRequest with default Technology
    useEffect(() => {
        if (defaultTechnologyQuery.data && userRequest.technology.id <= 0) {
            updateTechnology(defaultTechnologyQuery.data);
        }
    }, [defaultTechnologyQuery]);

    const updateTechnology = (technology: Technology) => {
        const newUserRequest = Request.clone(userRequest);
        newUserRequest.technology = Technology.clone(technology);
        setUserRequest(newUserRequest);
    }

    return (
        <Menu shadow="md" position='top-start'>
            <Menu.Target>
                <Tooltip label="Switch mode">
                    <ActionIcon
                        variant="subtle"
                        size="lg"
                        pos={"absolute"}
                        left={"30px"}
                    >
                        {
                            Technology.getIcon(userRequest.technology.slug, 20)
                        }
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            {
                technologiesQuery.data !== undefined && defaultTechnologyQuery.data !== undefined &&
                <Menu.Dropdown>
                    {
                        technologiesQuery.data.map((t: Technology) => {
                            return (
                                <Menu.Item
                                    leftSection={
                                        Technology.getIcon(t.slug, 14)
                                    }
                                    rightSection={
                                        t.id === userRequest.technology.id
                                            ? <IconCheck size={12} />
                                            : <></>
                                    }
                                    key={t.id}
                                    onClick={() => updateTechnology(t)}
                                >
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
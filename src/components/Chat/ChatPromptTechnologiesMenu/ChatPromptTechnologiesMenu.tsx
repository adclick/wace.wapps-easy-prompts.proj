import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { useUserRequest } from "../../../context/UserRequestContext";
import { Request } from "../../../model/Request";
import { Technology } from "../../../model/Technology";

export function ChatPromptTechnologiesMenu() {
    const { user } = useUser();
    const { data, isLoading, isSuccess } = useFiltersQuery(user.id);
    const { userRequest, setUserRequest } = useUserRequest();

    const updateUserRequestTechnology = (technology: Technology) => {
        const newUserRequest = Request.clone(userRequest);
        newUserRequest.technology = Technology.clone(technology);
        setUserRequest(newUserRequest);
    }

    const getMenuCheck = (key: number) => {
        if (key !== userRequest.technology.id) return <></>;

        return <IconCheck size={12} />;
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
                            isLoading || isSuccess && <IconPencil />
                        }
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            {
                data !== undefined &&
                <Menu.Dropdown>
                    {
                        data.technologies.map((t: Technology) => {
                            return (
                                <Menu.Item
                                    rightSection={getMenuCheck(t.id)}
                                    key={t.id}
                                    onClick={() => updateUserRequestTechnology(t)}
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
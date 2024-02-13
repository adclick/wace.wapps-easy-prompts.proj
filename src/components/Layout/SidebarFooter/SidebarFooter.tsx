import { Divider } from "@mantine/core";
import { FC } from "react";
import { PublicDatabasePanel } from "../../../features";

export const SidebarFooter: FC = () => {
    return (
        <>
            <Divider my={"xs"} />
            <PublicDatabasePanel />
        </>
    )
}
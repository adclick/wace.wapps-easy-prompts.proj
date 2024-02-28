import { Loader, Select } from "@mantine/core";
import { Technology } from "../../../models/Technology";
import { useTechnologiesQuery } from "../../../api/technologiesApi";
import { Provider } from "../../../models/Provider";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { Thread } from "../../../models/Thread";
import { FC, useEffect } from "react";

export interface TechnologyDataItem {
    label: string,
    value: string
}

const UserPromptOptionTechnologiesField: FC = () => {
    const [
        user,
        nextThread,
        setNextThread,
        selectedTemplates,
        selectedModifiers,
    ] = useStore(useShallow(state => [
        state.user,
        state.nextThread,
        state.setNextThread,
        state.selectedTemplates,
        state.selectedModifiers
    ]));

    const technologiesQuery = useTechnologiesQuery(user);

    useEffect(() => {
        if (nextThread.technology.id > 0) return;

        // Load from Template URL
        if (selectedTemplates.length > 0) {
            const firstTemplate = selectedTemplates[0];

            const newNextThread = Thread.clone(nextThread);
            newNextThread.technology = firstTemplate.technology;
            newNextThread.provider = firstTemplate.provider ? firstTemplate.provider : new Provider();
            setNextThread(newNextThread);

            return;
        }

        // Load from Modifier URL
        if (selectedModifiers.length > 0) {
            const firstModifier = selectedModifiers[0];

            const newNextThread = Thread.clone(nextThread);
            newNextThread.technology = firstModifier.technology;
            newNextThread.provider = firstModifier.provider ? firstModifier.provider : new Provider();
            setNextThread(newNextThread);
        }

        // Load default technology from server-side
        if (technologiesQuery.data && nextThread.technology.id <= 0) {
            const newNextThread = Thread.clone(nextThread);
            newNextThread.technology = technologiesQuery.data[0];
            newNextThread.provider = new Provider();
            setNextThread(newNextThread);

            return;
        }
    }, [technologiesQuery, selectedTemplates])

    const onChangeTechnology = (technologyId: string | null) => {
        const technology = technologiesQuery.data.find((t: Technology) => t.id === parseInt(technologyId as string));
        if (technology) {
            const newNextThread = Thread.clone(nextThread);
            newNextThread.technology = Technology.clone(technology);
            newNextThread.provider = new Provider();
            setNextThread(newNextThread);
        }
    }

    // Technology list
    if (technologiesQuery.data) {
        const data = technologiesQuery.data.map((technology: Technology) => {
            return {
                label: technology.name,
                value: technology.id.toString()
            }
        });

        return <Select
            label={"Technologies"}
            allowDeselect={false}
            variant="unstyled"
            checkIconPosition="right"
            size="md"
            comboboxProps={{ withinPortal: false }}
            value={nextThread.technology.id.toString()}
            data={data}
            onChange={onChangeTechnology}
        />
    }

    return (
        <Loader size={"xs"} type="dot" />
    )
}

export default UserPromptOptionTechnologiesField;
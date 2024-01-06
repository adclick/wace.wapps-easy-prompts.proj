import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { Type } from "../../../model/SelectedDatabaseType";
import { ModifiersList } from "../ModifiersList/ModifiersList";
import { PromptsList } from "../PromptsList/PromptsList";

export function DatabaseListContainer() {
    const {selectedDatabaseType} = useSelectedDatabaseType();

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList />
        case Type.MODIFIER:
            return <ModifiersList />
    }
}
import { UseFormReturnType } from "@mantine/form";
import { PromptFormValues } from "../../../context/PromptFormContext";
import { ModifierFormValues } from "../../../context/ModifierFormContext";
import { TemplateFormValues } from "../../../context/TemplateFormContext";

export interface FieldProps {
    form: UseFormReturnType<PromptFormValues | ModifierFormValues | TemplateFormValues>;
}
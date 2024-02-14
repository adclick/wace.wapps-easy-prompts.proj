import { UseFormReturnType } from "@mantine/form";
import { PromptFormValues } from "../../context/PromptFormContext";

export interface FieldProps {
    form: UseFormReturnType<PromptFormValues>
}
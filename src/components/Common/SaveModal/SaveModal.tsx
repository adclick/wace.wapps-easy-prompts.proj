import { Button, Group, Modal, SegmentedControl, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useCreatePromptMutation } from "../../../api/promptsApi";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../../model/SelectedDatabaseType";
import { Repository } from "../../../model/Repository";
import { Language } from "../../../model/Language";
import { useCreateTemplateMutation } from "../../../api/templatesApi";
import { useCreateModifierMutation } from "../../../api/modifiersApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { useFiltersQuery } from "../../../api/filtersApi";

interface SaveModal {
    handle: any
    request: PromptRequest | null,
}

export function SaveModal({
    handle,
    request,
}: SaveModal) {
    const { selectedFilters } = useSelectedFilters();
    if (!selectedFilters) return <></>;

    const { user } = useUser();
    const [languageId, setLanguageId] = useState(selectedFilters.languages_ids[0].toString());
    const [repositoryId, setRepositoryId] = useState(selectedFilters.repositories_ids[0].toString());
    const [name, setName] = useState(request ? request.title : "");
    const [description, setDescription] = useState(request ? request.description : "");
    const [content, setContent] = useState(request ? request.content : "");
    const [descriptionError, setDescriptionError] = useState('');
    const [contentError, setContentError] = useState('');
    const { setSelectedDatabaseType } = useSelectedDatabaseType();
    const [type, setType] = useState(Type.PROMPT.toString());

    const createPromptMutation = useCreatePromptMutation();
    const createTemplateMutation = useCreateTemplateMutation();
    const createModifierMutation = useCreateModifierMutation();

    const filtersQuery = useFiltersQuery(user.id);

    const save = async () => {
        if (description === "") {
            setDescriptionError("Field is required");
            return;
        }

        if (content === "" && (type === Type.PROMPT || type == Type.MODIFIER)) {
            setContentError("Field is required");
            return;
        }

        const modifiersIds = request ? request.metadata.modifiers.map(m => m.id) : [];
        const chatHistory = request ? request.metadata.history : [];
        const contentValue = request && request.chatReply !== "" ? request.chatReply : content;

        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", request ? request.technology.id.toString() : "1");
        newFormData.append("provider_id", request ? request.provider.id.toString() : "1");
        newFormData.append("title", name);
        newFormData.append("description", description);
        newFormData.append("content", contentValue);
        newFormData.append("modifiers_ids", JSON.stringify(modifiersIds));
        newFormData.append("chat_history", JSON.stringify(chatHistory));

        if (type === Type.PROMPT) {
            createPromptMutation.mutate(newFormData);

            const newType = new SelectedDatabaseType();
            newType.type = Type.PROMPT;
            newType.label = Label.Prompt;
            newType.labelPlural = LabelPlural.Prompts
            setSelectedDatabaseType(newType);
        } else if (type === Type.TEMPLATE) {
            createTemplateMutation.mutate(newFormData);

            const newType = new SelectedDatabaseType();
            newType.type = Type.TEMPLATE;
            newType.label = Label.Tempalate;
            newType.labelPlural = LabelPlural.Tempalates
            setSelectedDatabaseType(newType);
        } else if (type === Type.MODIFIER) {
            createModifierMutation.mutate(newFormData);

            const newType = new SelectedDatabaseType();
            newType.type = Type.MODIFIER;
            newType.label = Label.Modifier;
            newType.labelPlural = LabelPlural.Modifiers
            setSelectedDatabaseType(newType);
        }

        handle.close();
    }

    let languages = [];
    let repositories = [];

    if (filtersQuery.data) {
        languages = filtersQuery.data.languages.map((r: Language) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        repositories = filtersQuery.data.repositories.map((r: Repository) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });
    }

    const updateLanguage = (value: string | null) => {
        if (value) {
            setLanguageId(value);
        }
    }


    const updateRepository = (value: string | null) => {
        if (value) {
            setRepositoryId(value);
        }
    }

    const updateDescription = (value: string) => {
        setDescription(value);
        setDescriptionError("");
    }

    const updateContent = (value: string) => {
        setContent(value);
        setContentError("");
    }

    return (
        <Stack my={"xs"}>
            <SegmentedControl
                value={type}
                size="sm"
                data={[
                    { value: Type.PROMPT, label: "Prompt" },
                    { value: Type.TEMPLATE, label: "Template" },
                    { value: Type.MODIFIER, label: "Modifier" },
                ]}
                onChange={setType}
            />
            <Select
                label="Language"
                required
                placeholder="Language"
                data={languages}
                value={languageId}
                allowDeselect={false}
                onChange={updateLanguage}
            />
            <Select
                label="Repository"
                required
                placeholder="Repository"
                data={repositories}
                value={repositoryId}
                allowDeselect={false}
                onChange={updateRepository}
            />
            <TextInput
                label="Name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                required
                placeholder="Name of the Modifier"
            />
            <Textarea
                label="Description"
                autosize
                required
                minRows={3}
                onChange={(e: any) => updateDescription(e.target.value)}
                value={description}
                placeholder="Write a brief description"
                error={descriptionError}
            />
            {
                (type === Type.PROMPT || type === Type.MODIFIER) &&
                <Textarea
                    label="Content"
                    autosize
                    required
                    minRows={3}
                    onChange={(e: any) => updateContent(e.target.value)}
                    value={content}
                    error={contentError}
                />
            }
            <Group justify="flex-end">
                <Button
                    variant="transparent"
                    color="gray"
                    size="xs"
                    onClick={save}
                    leftSection={<IconCheck size={14} />}
                >
                    Save
                </Button>
            </Group>
        </Stack>
    )
}
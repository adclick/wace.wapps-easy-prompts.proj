import { useEffect, useState } from "react"
import { Accordion, ActionIcon, Button, Chip, Group, Input, Popover, ScrollArea, Stack, Text, Title, rem } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Modifier, Parameter, PromptOptions, Provider, Technology } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";
import { LanguageOption } from "../Options/LanguageOption";
import { ParameterOption } from "../Options/ParameterOption";
import { ModifiersOption } from "../Options/ModifiersOption";

interface OptionsPanel {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    navbarToggle: any
}

export function OptionsPanel({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    navbarToggle
}: OptionsPanel) {
    // technologies
    const defaultTechnology = promptOptions.getDefaultTechnology();
    const [technologies, setTechnologies] = useState<Technology[]>(promptOptions.getTechnologies());
    const [technology, setTechnology] = useState<Technology>(defaultTechnology);

    // providers
    const defaultProvider = promptOptions.getDefaultProviderSlug(defaultTechnology.slug);
    const [providers, setProviders] = useState<Provider[]>(promptOptions.getProviders(defaultTechnology.slug));
    const [provider, setProvider] = useState(promptOptions.getDefaultProviderSlug(defaultTechnology.slug));

    // parameters
    const [parameters, setParameters] = useState<Parameter[]>(promptOptions.getParameters(defaultTechnology.slug, defaultProvider));
    const [languageValue, setLanguageValue] = useState("PT");

    // modifiers
    const [modifiers, setModifiers] = useState<Modifier[]>(promptOptions.getModifiers(defaultTechnology.slug));

    // Init logic
    useEffect(() => {
        fetchPromptOptions();
    }, []);

    const fetchPromptOptions = async () => {
        const aIMediatorClient = new AIMediatorClient();
        const promptOptions = await aIMediatorClient.getPromptOptions();
        const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

        const currentTechnology = promptOptionsObj.getDefaultTechnology();
        const currentProviderSlug = promptOptionsObj.getDefaultProviderSlug(currentTechnology.slug);

        // Initialize prompt options default values
        setPromptOptions(promptOptionsObj);
        setTechnologies(promptOptionsObj.getTechnologies());
        setProviders(promptOptionsObj.getProviders(currentTechnology.slug));
        setParameters(promptOptionsObj.getParameters(currentTechnology.slug, currentProviderSlug));
        setModifiers(promptOptionsObj.getModifiers(currentTechnology.slug));
        setTechnology(currentTechnology);
        setProvider(currentProviderSlug);

        // Initialize user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(currentTechnology.slug);
        newUserPromptOptions.setProvider(currentProviderSlug);
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeTechnology = (newTechnologySlug: string) => {
        const technology = promptOptions.getTechnologyBySlug(newTechnologySlug);
        setTechnology(technology);

        const providers = promptOptions.getProviders(newTechnologySlug);
        setProviders(providers);

        const newProviderSlug = promptOptions.getDefaultProviderSlug(newTechnologySlug);
        setProvider(newProviderSlug);

        const parameters = promptOptions.getParameters(newTechnologySlug, newProviderSlug);
        setParameters(parameters);

        const modifiers = promptOptions.getModifiers(newTechnologySlug);
        setModifiers(modifiers);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(newTechnologySlug);
        newUserPromptOptions.setProvider(newProviderSlug)
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeProvider = (newProvider: string) => {
        setProvider(newProvider);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setProvider(newProvider);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Stack gap={'md'}>
            <Accordion variant="default" chevron="">
                <TechnologyOption
                    promptOptions={promptOptions}
                    currentTechnology={technology}
                    technologies={technologies}
                    handleOnChangeTechnology={handleOnChangeTechnology}
                />
                <ProviderOption
                    promptOptions={promptOptions}
                    currentProvider={provider}
                    providers={providers}
                    handleOnChangeProvider={handleOnChangeProvider}
                />
                {
                    parameters.map(parameter => {
                        return (
                            <ParameterOption
                                type={parameter.slug}
                                parameter={parameter}
                                userPromptOptions={userPromptOptions}
                                setUserPromptOptions={setUserPromptOptions}
                            />
                        )
                    })
                }
                <LanguageOption
                    languages={["PT", "EN"]}
                    defaultLanguage={"PT"}
                    currentLanguage={languageValue}
                    setLanguage={setLanguageValue}
                />
                <ModifiersOption
                    modifiers={modifiers}
                    promptOptions={promptOptions}
                    userPromptOptions={userPromptOptions}
                    setUserPromptOptions={setUserPromptOptions}
                    currentTechnologySlug={technology.slug}
                />
            </Accordion>
            <Button onClick={navbarToggle} hiddenFrom='sm'>
                Apply
            </Button>
        </Stack>
    )
}
import { useEffect, useState } from "react"
import { Accordion, Button, Stack, Tabs } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { PromptOptions } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";
import { ParameterOption } from "../Options/ParameterOption";
import { ModifiersOption } from "../Options/ModifiersOption";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Parameter } from "../../model/Parameter";
import { Modifier } from "../../model/Modifier";
import { Language } from "../../model/Language";

interface OptionsPanel {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    navbarToggle: any,
    language: Language,
    setLanguage: any
}

export function OptionsPanel({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    navbarToggle,
    language,
    setLanguage
}: OptionsPanel) {
    // technologies
    const defaultTechnology = promptOptions.getDefaultTechnology();
    const [technologies, setTechnologies] = useState<Technology[]>(promptOptions.getTechnologies());
    const [technology, setTechnology] = useState<Technology>(defaultTechnology);

    // providers
    const defaultProvider = promptOptions.getDefaultProvider(defaultTechnology.slug);
    const [providers, setProviders] = useState<Provider[]>(promptOptions.getProviders(defaultTechnology.slug));
    const [provider, setProvider] = useState(promptOptions.getDefaultProvider(defaultTechnology.slug));

    // parameters
    const [parameters, setParameters] = useState<Parameter[]>(promptOptions.getParameters(defaultTechnology.slug, defaultProvider.slug));

    // modifiers
    const [modifiers, setModifiers] = useState<Modifier[]>(promptOptions.getModifiers(defaultTechnology.slug));
    const [activeModifiers, setActiveModifiers] = useState<Modifier[]>([]);

    // Init logic
    useEffect(() => {
        fetchPromptOptions();
    }, []);

    const fetchPromptOptions = async () => {
        const aIMediatorClient = new AIMediatorClient();
        const promptOptions = await aIMediatorClient.getPromptOptions(language);
        const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

        const currentTechnology = promptOptionsObj.getDefaultTechnology();
        const currentProvider = promptOptionsObj.getDefaultProvider(currentTechnology.slug);

        // Initialize prompt options default values
        setPromptOptions(promptOptionsObj);
        setTechnologies(promptOptionsObj.getTechnologies());
        setProviders(promptOptionsObj.getProviders(currentTechnology.slug));
        setParameters(promptOptionsObj.getParameters(currentTechnology.slug, currentProvider.slug));
        setModifiers(promptOptionsObj.getModifiers(currentTechnology.slug));
        setTechnology(currentTechnology);
        setProvider(currentProvider);

        // Initialize user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(currentTechnology);
        newUserPromptOptions.setProvider(currentProvider);
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeTechnology = (newTechnologySlug: string) => {
        const technology = promptOptions.getTechnologyBySlug(newTechnologySlug);
        setTechnology(technology);

        const providers = promptOptions.getProviders(newTechnologySlug);
        setProviders(providers);

        const newProvider = promptOptions.getDefaultProvider(newTechnologySlug);
        setProvider(newProvider);

        const parameters = promptOptions.getParameters(newTechnologySlug, newProvider.slug);
        setParameters(parameters);

        const modifiers = promptOptions.getModifiers(newTechnologySlug);
        setModifiers(modifiers);
        setActiveModifiers([]);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(technology);
        newUserPromptOptions.setProvider(newProvider)
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeProvider = (newProviderSlug: string) => {
        const newProvider = promptOptions.getProviderBySlug(newProviderSlug);
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
                                key={parameter.slug}
                                type={parameter.slug}
                                parameter={parameter}
                                userPromptOptions={userPromptOptions}
                                setUserPromptOptions={setUserPromptOptions}
                            />
                        )
                    })
                }
                <ModifiersOption
                    modifiers={modifiers}
                    activeModifiers={activeModifiers}
                    setActiveModifiers={setActiveModifiers}
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
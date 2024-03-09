import { Modifier } from "./Modifier";
import { Prompt } from "./Prompt";
import { PromptChatMessage } from "./PromptChatMessage";
import { Provider } from "./Provider";
import { Technology } from "./Technology";
import { Template } from "./Template";
import { ThreadModifier } from "./ThreadModifier";
import { ThreadParameter } from "./ThreadParameter";
import { ThreadTemplate } from "./ThreadTemplate";
import { User } from "./User";
import { Workspace } from "./Workspace";

export class Thread {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    content: string;
    response: string;
    collapsed: boolean;
    created_at: Date;
    key: number;
    technology: Technology;
    provider: Provider;
    user: User;
    workspace: Workspace;
    threads_chat_messages: PromptChatMessage[];
    threads_modifiers: ThreadModifier[];
    templates: Template[];
    modifiers: Modifier[];
    threads_templates: ThreadTemplate[];
    threads_parameters: ThreadParameter[];

    constructor(key: number = 0) {
        this.id = 0;
        this.uuid = "";
        this.title = "";
        this.slug = "";
        this.content = "";
        this.response = "";
        this.collapsed = false;
        this.created_at = new Date();
        this.key = key;
        this.technology = new Technology();
        this.provider = new Provider();
        this.user = new User();
        this.workspace = new Workspace();
        this.threads_chat_messages = [];
        this.threads_modifiers = [];
        this.templates = [];
        this.modifiers = [];
        this.threads_templates = [];
        this.threads_parameters = [];
    }

    static clone(thread: Thread): Thread {
        const newThread = new Thread();

        newThread.uuid = thread.uuid;
        newThread.title = thread.title;
        newThread.slug = thread.slug;
        newThread.content = thread.content;
        newThread.response = thread.response;
        newThread.created_at = thread.created_at;
        newThread.key = thread.key;
        newThread.technology = Technology.clone(thread.technology);
        newThread.provider = Provider.clone(thread.provider);
        newThread.user = thread.user;
        newThread.workspace = thread.workspace;
        newThread.threads_templates = thread.threads_templates;
        newThread.threads_modifiers = thread.threads_modifiers;
        newThread.modifiers = thread.modifiers;
        newThread.threads_chat_messages = thread.threads_chat_messages;
        newThread.threads_parameters = thread.threads_parameters;

        return newThread;
    }

    static buildFromPrompt(prompt: Prompt): Thread {
        const newThread = new Thread();

        newThread.title = prompt.title;
        newThread.slug = prompt.slug;
        newThread.content = prompt.content;
        newThread.created_at = prompt.created_at;
        newThread.technology = Technology.clone(prompt.technology);
        newThread.provider = Provider.clone(prompt.provider);
        newThread.user = prompt.user;
        newThread.threads_templates = prompt.prompts_templates;
        newThread.threads_modifiers = prompt.prompts_modifiers;
        newThread.threads_parameters = prompt.prompts_parameters;
        newThread.threads_chat_messages = prompt.prompts_chat_messages.map(m => {
            return {
                role: m.role,
                message: m.message,
                threads_chat_messages_templates: m.threads_chat_messages_templates,
                threads_chat_messages_modifiers: m.threads_chat_messages_modifiers
            }
        });


        return newThread;
    }

    static getParameterValue(thread: Thread, parameterSlug: string, defaultValue: string) {
        const parameter = thread.threads_parameters.find(tp => {
            const parameterFromProvider = thread.provider.parameters.find(p => p.slug ===  parameterSlug);

            return parameterFromProvider && tp.parameter_id === parameterFromProvider.id
        });

        if (!parameter) {
            return defaultValue;
        }

        return parameter.value;
    }
}
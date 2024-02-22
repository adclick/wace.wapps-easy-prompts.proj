import { ParametersList } from "./ParametersList";
import { Metadata, Prompt, PromptParameter } from "./Prompt";
import { PromptChatMessage } from "./PromptChatMessage";
import { Provider } from "./Provider";
import { Technology } from "./Technology";
import { ThreadModifier } from "./ThreadModifier";
import { ThreadTemplate } from "./ThreadTemplate";
import { User } from "./User";
import { Workspace } from "./Workspace";

export class Thread {
    id: number;
    title: string;
    slug: string;
    content: string;
    response: string;
    created_at: Date;
    key: number;
    technology: Technology;
    provider: Provider;
    user: User;
    workspace: Workspace;
    metadata: Metadata;
    parametersList: ParametersList;
    threads_chat_messages: PromptChatMessage[];
    threads_modifiers: ThreadModifier[];
    threads_templates: ThreadTemplate[];
    threads_parameters: PromptParameter[];

    constructor(key: number = 0) {
        this.id = 0;
        this.title = "";
        this.slug = "";
        this.content = "";
        this.response = "";
        this.created_at = new Date();
        this.key = key;
        this.technology = new Technology();
        this.provider = new Provider();
        this.user = new User();
        this.workspace = new Workspace();
        this.parametersList = new ParametersList();
        this.metadata = {modifiers: [], history: [], templates: []}
        this.threads_chat_messages = [];
        this.threads_modifiers = [];
        this.threads_templates = [];
        this.threads_parameters = [];
    }

    static clone (thread: Thread): Thread {
        const newThread = new Thread();

        newThread.id = thread.id;
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
        newThread.threads_chat_messages = prompt.prompts_chat_messages.map(m => {
            return {
                role: m.role,
                message: m.message
            }
        });

        return newThread;
    }
}
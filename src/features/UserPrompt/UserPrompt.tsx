import { FC, KeyboardEvent } from "react";
import { Textarea } from "../../components/UI/Inputs/Textarea";
import { IconButton } from "../../components/UI/Buttons/IconButton";
import classes from "./UserPrompt.module.css";
import { FlexRow } from "../../components/UI/Layout";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { PromptChatMessageRole, Size, Variant } from "../../enums";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Thread } from "../../models/Thread";

const UserPrompt: FC = () => {
    const [
        nextThread,
        setNextThread,
        threads,
        setThreads,
        selectedModifiers,
        selectedTemplates,
    ] = useStore(useShallow(state => [
        state.nextThread,
        state.setNextThread,
        state.threads,
        state.setThreads,
        state.selectedModifiers,
        state.selectedTemplates,
    ]));


    const updateNextThread = (value: string) => {
        const newNextThread = Thread.clone(nextThread);
        newNextThread.key = Date.now();
        newNextThread.title = value;
        newNextThread.prompt.content = value;
        newNextThread.prompt.prompts_chat_messages = [{role: PromptChatMessageRole.USER, message: value}];
        setNextThread(newNextThread);
    }

    const submit = () => {
        nextThread.prompt.metadata.modifiers = selectedModifiers;
        nextThread.prompt.metadata.templates = selectedTemplates;
        setThreads([...threads, nextThread]);

        updateNextThread("");
    }

    const onKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submit();
        }
    }

    return (
        <FlexRow>
            <Textarea
                placeholder="Create a new prompt"
                autofocus={true}
                size={Size.lg}
                radius={Size.xl}
                value={nextThread.prompt.content}
                onChange={e => updateNextThread(e.target.value)}
                onKeyDown={e => onKeyDown(e)}
                className={classes.textarea}
            />
            <IconButton
                variant={Variant.filled}
                size={Size.lg}
                onClick={submit}
                icon={<IconPlayerPlayFilled size={16} stroke={1.5} />}
                className={classes.playButton}
            />
        </FlexRow>
    )
}

export default UserPrompt;
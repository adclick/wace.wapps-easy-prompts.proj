import { FC, KeyboardEvent, useEffect, useState } from "react";
import { Textarea } from "../../components/UI/Inputs/Textarea";
import { IconButton } from "../../components/UI/Buttons/IconButton";
import classes from "./UserPrompt.module.css";
import { FlexRow } from "../../components/UI/Layout";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { PromptChatMessageRole, Size, Variant } from "../../enums";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Thread } from "../../models/Thread";
import { ThreadModifier } from "../../models/ThreadModifier";
import { ThreadTemplate } from "../../models/ThreadTemplate";
import { useLocation, useParams } from "react-router-dom";
import { usePromptQuery } from "../../api/promptsApi";
import { getDefaultProvider } from "../../api/providersApi";

const UserPrompt: FC = () => {
    const [
        user,
        nextThread,
        setNextThread,
        threads,
        setThreads,
        selectedModifiers,
        selectedTemplates,
    ] = useStore(useShallow(state => [
        state.user,
        state.nextThread,
        state.setNextThread,
        state.threads,
        state.setThreads,
        state.selectedModifiers,
        state.selectedTemplates,
    ]));

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const promptId = searchParams.get('prompt_id') || '0';
    const { data: urlPrompt } = usePromptQuery(user, Number(promptId));

    useEffect(() => {
        console.log("effe")
        if (urlPrompt) {
            const newThread = Thread.buildFromPrompt(urlPrompt);
            newThread.threads_chat_messages.pop();
            newThread.key = Date.now();


            setThreads([
                ...threads,
                newThread
            ]);
            console.log("if")
            console.log(urlPrompt)
        }
    }, [promptId, urlPrompt])

    const updateNextThread = (value: string) => {
        const newNextThread = Thread.clone(nextThread);
        newNextThread.key = Date.now();
        newNextThread.title = value;
        newNextThread.content = value;
        newNextThread.threads_chat_messages = [{ role: PromptChatMessageRole.USER, message: value }];
        setNextThread(newNextThread);
    }

    const submit = () => {
        nextThread.threads_modifiers = ThreadModifier.buildFromSelectedModifiers(selectedModifiers);
        nextThread.threads_templates = ThreadTemplate.buildFromSelectedTemplates(selectedTemplates);

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
                value={nextThread.content}
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
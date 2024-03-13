import { Avatar, Button, Group, Textarea } from "@mantine/core";
import { useState } from "react";
import { iconPlay } from "../../../../utils/iconsUtils";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface ChatThreadReplyContainer {
    reply: any
}

export function ChatThreadReplyContainer({ reply }: ChatThreadReplyContainer) {
    const [replyValue, setReplyValue] = useState('');
    const [user] = useStore(useShallow(state => [state.user]));

    const onKeyDown = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setReplyValue('');
            reply(replyValue);
            e.preventDefault();
        }
    }

    return (
        <Group wrap="nowrap">
            <Avatar src={user.picture} size={"sm"} />
            <Textarea
                placeholder="Reply here"
                autosize
                autoFocus
                minRows={1}
                maxRows={6}
                w={"100%"}
                styles={{
                    input: {
                        paddingRight: "90px",
                    },

                }}
                value={replyValue}
                onChange={e => setReplyValue(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <Button
                onClick={() => reply(replyValue)}
                rightSection={iconPlay(12)}
                color="gray"
                variant="transparent"
                size="xs"
                pos={"absolute"}
                right={"25px"}
            >
                Reply
            </Button>
        </Group>
    )
}
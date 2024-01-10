import { ActionIcon, Group, Textarea } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";

interface ChatThreadReplyContainer {
    reply: any
}

export function ChatThreadReplyContainer({reply}: ChatThreadReplyContainer) {
    const [replyValue, setReplyValue] = useState('');

    const onKeyDown = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setReplyValue('');
            reply(replyValue)
            e.preventDefault();
        }
    }

    return (
        <Group>
            <Textarea
                placeholder="Reply here"
                autosize
                autoFocus
                minRows={1}
                maxRows={6}
                w={"100%"}
                styles={{
                    input: {
                        paddingRight: "50px",
                    },

                }}
                radius={"xl"}
                value={replyValue}
                onChange={e => setReplyValue(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <ActionIcon
                variant="filled"
                pos={"absolute"}
                right={"25px"}
                onClick={() => reply(replyValue, setReplyValue)}
            >
                <IconPlayerPlayFilled size={14} stroke={1.5} />
            </ActionIcon>
        </Group>
    )
}
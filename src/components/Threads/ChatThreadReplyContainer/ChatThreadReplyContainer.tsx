import { ActionIcon, Group, Textarea } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";

interface ChatThreadReplyContainer {
    reply: any
}

export function ChatThreadReplyContainer({reply}: ChatThreadReplyContainer) {
    const [replyValue, setReplyValue] = useState('');

    return (
        <Group>
            <Textarea
                placeholder="Write a message"
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
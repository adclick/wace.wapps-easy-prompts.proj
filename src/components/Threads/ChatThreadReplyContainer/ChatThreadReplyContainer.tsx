import { ActionIcon, Avatar, Group, Textarea } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useUser } from "../../../context/UserContext";

interface ChatThreadReplyContainer {
    reply: any
}

export function ChatThreadReplyContainer({reply}: ChatThreadReplyContainer) {
    const [replyValue, setReplyValue] = useState('');
    const {user} = useUser();

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
                        paddingRight: "50px",
                    },

                }}
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
import { Textarea as MantineTextarea } from "@mantine/core";
import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import { Size } from "../../../../enums";

interface TextareaProps {
    placeholder?: string;
    autosize?: boolean;
    autofocus?: boolean;
    minRows?: number;
    maxRows?: number;
    size?: Size;
    radius?: Size;
    value?: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    className?: string;
}

const Textarea: FC<TextareaProps> = ({
    placeholder,
    autosize = true,
    autofocus = false,
    minRows = 1,
    maxRows = 6,
    size = Size.md,
    radius,
    value,
    onChange,
    onKeyDown,
    className
}: TextareaProps) => {
    return (
        <MantineTextarea
            placeholder={placeholder}
            autosize={autosize}
            autoFocus={autofocus}
            minRows={minRows}
            maxRows={maxRows}
            size={size}
            radius={radius}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={className}
        />
    )
}

export default Textarea;
import { ReactNode } from "react";
import { FlexAlign, FlexJustify, Size } from "../../../../enums";
import FlexWrap from "../../../../enums/FlexWrap";

interface FlexProps {
    gap?: Size;
    justify?: FlexJustify;
    align?: FlexAlign;
    wrap?: FlexWrap;
    children?: ReactNode
}

export default FlexProps;
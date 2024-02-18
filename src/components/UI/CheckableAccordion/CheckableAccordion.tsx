import { Accordion } from "@mantine/core";
import { FC, ReactNode } from "react";

interface CheckableAccordionProps {
    items: {value: string, header: ReactNode, content: ReactNode}[]
}

const CheckableAccordion: FC<CheckableAccordionProps> = ({
    items
}: CheckableAccordionProps) => {
    return (
        <Accordion variant="separated" chevron="" styles={{
            chevron: {
                display: "none"
            }
        }}>
            {
                items.map(item => {
                    return (
                        <Accordion.Item value={item.value}>
                            <Accordion.Control>
                                {item.header}
                            </Accordion.Control>
                            <Accordion.Panel>
                                {item.content}
                            </Accordion.Panel>
                        </Accordion.Item>
                    )
                })
            }
        </Accordion>
    )
}

export default CheckableAccordion;
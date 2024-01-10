import { Textarea } from "@mantine/core";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";

interface SearchTermFilter {
    selectedFilters: PromptsSelectedFilters | ModifiersSelectedFilters,
    setSelectedFilters: any
}

export function SearchTermFilter({ selectedFilters, setSelectedFilters }: SearchTermFilter) {

    const searchSearchTerm = ((term: string) => {
        setSelectedFilters({
            ...selectedFilters,
            search_term: term
        });
    })

    return (
        <Textarea
            placeholder={"Search"}
            autosize
            minRows={1}
            maxRows={6}
            value={selectedFilters.search_term}
            onChange={e => searchSearchTerm(e.target.value)}
        />
    )
}
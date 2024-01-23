import { Textarea } from "@mantine/core";
import { SelectedFilters } from "../../../model/SelectedFilters";

interface SearchTermFilter {
    selectedFilters: SelectedFilters,
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
            size="xs"
            minRows={1}
            maxRows={6}
            value={selectedFilters.search_term}
            onChange={e => searchSearchTerm(e.target.value)}
        />
    )
}
import { Textarea } from "@mantine/core";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";

interface SearchTermFilter {

}

export function SearchTermFilter({

}: SearchTermFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const searchSearchTerm = ((term: string) => {
        const newFilters = {
            ...selectedFilters,
            search_term: term
        };

        setSelectedFilters(newFilters);
    })

    return (
        <Textarea
            placeholder={"Search"}
            autosize
            autoFocus
            minRows={1}
            maxRows={6}
            value={selectedFilters.search_term}
            onChange={e => searchSearchTerm(e.target.value)}
        />
    )
}
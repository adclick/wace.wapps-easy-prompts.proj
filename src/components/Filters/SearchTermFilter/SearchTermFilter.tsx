import { Textarea } from "@mantine/core";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";


export function SearchTermFilter() {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

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
            autoFocus
            minRows={1}
            maxRows={6}
            value={selectedFilters.search_term}
            onChange={e => searchSearchTerm(e.target.value)}
        />
    )
}
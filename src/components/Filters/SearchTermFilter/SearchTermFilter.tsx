import { Textarea } from "@mantine/core";
import { SelectedFilters } from "../../../model/SelectedFilters";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface SearchTermFilter {
    selectedFilters: SelectedFilters,
    setSelectedFilters: any
}

export function SearchTermFilter({ selectedFilters, setSelectedFilters }: SearchTermFilter) {
    const [searchTerm, setSearchTerm] = useState(selectedFilters.search_term);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setSelectedFilters({
                ...selectedFilters,
                search_term: searchTerm
            });
        }
    }, [debouncedSearchTerm])

    const searchSearchTerm = ((term: string) => {
        setSearchTerm(term);
    })

    return (
        <Textarea
            placeholder={"Search"}
            autosize
            size="sm"
            minRows={1}
            maxRows={6}
            value={searchTerm}
            onChange={e => searchSearchTerm(e.target.value)}
        />
    )
}
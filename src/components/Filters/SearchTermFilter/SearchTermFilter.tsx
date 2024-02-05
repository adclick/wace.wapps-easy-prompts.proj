import { Textarea } from "@mantine/core";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

interface SearchTermFilter {
    selectedFilters: SelectedFilters,
    setSelectedFilters: any
}

export function SearchTermFilter({ selectedFilters, setSelectedFilters }: SearchTermFilter) {
    const [searchTerm, setSearchTerm] = useState(selectedFilters.search_term);

    const [debounced] = useDebouncedValue(searchTerm, 300);

    useEffect(() => {
        setSelectedFilters({
            ...selectedFilters,
            search_term: searchTerm
        });
    }, [debounced])

    return (
        <Textarea
            placeholder={"Search"}
            autosize
            size="sm"
            minRows={1}
            maxRows={6}
            value={searchTerm}
            onChange={e => setSearchTerm(e.currentTarget.value)}
        />
    )
}
import { Button } from "@mantine/core";

interface DatabaseLoadMoreButton {
    itemQuery: any
}

export function DatabaseLoadMoreButton({ itemQuery }: DatabaseLoadMoreButton) {
    return (
        itemQuery.data.pages.length > 1 &&
        <Button
            variant="default"
            size="xs"
            onClick={() => itemQuery.fetchNextPage()}
            disabled={!itemQuery.hasNextPage || itemQuery.isFetchingNextPage}
        >
            {
                itemQuery.isFetchingNextPage
                    ? "Loading more..."
                    : itemQuery.hasNextPage
                        ? "Load More"
                        : "Nothing more to load"
            }
        </Button>
    )
}
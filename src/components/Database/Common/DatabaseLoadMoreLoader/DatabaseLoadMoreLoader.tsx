import { Button, Center, Loader, Stack, Text } from "@mantine/core";

interface DatabaseLoadMoreLoader {
    itemQuery: any
}

export function DatabaseLoadMoreLoader({ itemQuery }: DatabaseLoadMoreLoader) {
    if (!itemQuery.hasNextPage) {
        return <></>
    }

    return (
        <Stack>
            <Button
                variant="default"
                color="--mantine-color-text"
                onClick={() => itemQuery.fetchNextPage()}
                disabled={!itemQuery.hasNextPage || itemQuery.isFetchingNextPage}
            >
                {itemQuery.isFetchingNextPage
                    ? 'Loading more...'
                    : itemQuery.hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
            </Button>
            <Text>{itemQuery.isFetching && !itemQuery.isFetchingNextPage ? 'Fetching...' : null}</Text>
      </Stack >
    )
}
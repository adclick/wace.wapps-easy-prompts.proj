import { Center, Loader, Text } from "@mantine/core";

interface DatabaseLoadMoreLoader {
    itemQuery: any
}

export function DatabaseLoadMoreLoader({ itemQuery }: DatabaseLoadMoreLoader) {
    if (itemQuery.isFetchingNextPage) {
        return <Center mb={"xl"}>
            <Loader type="bars" size={"xs"} />
        </Center>
    }

    if (!itemQuery.hasNextPage && itemQuery.data && itemQuery.data.pages.length > 1) {
        return <Center mb={"xl"}>
            <Text size="sm" fw={700}>No more items</Text>
        </Center>
    }

    return <></>;
}
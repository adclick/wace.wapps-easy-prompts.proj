import { ActionIcon, Button, Dialog, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const AppUpdateModal: FC = () => {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisterError(error) {
			console.log("SW registration error", error);
		},
	});

	const close = () => {
		setOfflineReady(false);
		setNeedRefresh(false);
	};

	useEffect(() => {
		offlineReady &&
			showNotification({
				title: "Ready",
				message: "App is ready to work offline",
			});
	}, [offlineReady]);

	return (
		<>
			<Dialog
				opened={needRefresh}
				onClose={close}
			>
				<Stack gap={"xs"}>
					<Group justify="space-between">
						<Title order={5}>A new update is available.</Title>
						<ActionIcon onClick={close} variant="transparent" color="var(--mantine-color-default-color)">
							<IconX size={14} />
						</ActionIcon>
					</Group>

					<Group justify="flex-end">
						<Button size="xs" c={"var(--mantine-color-text)"} variant="transparent" color="gray" onClick={close}>
							Cancel
						</Button>
						<Button size="xs" onClick={() => updateServiceWorker(true)}>Reload</Button>
					</Group>
				</Stack>
			</Dialog>
		</>
	);
};

export default AppUpdateModal;
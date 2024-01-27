import { Button, Dialog, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const AppUpdateModal = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
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
      <Modal
        opened={needRefresh}
        title="Install update"
        onClose={close}
        centered
      >
        <Stack gap={"xs"}>
          <Title order={5}>A new update is available.</Title>

          <Stack gap={"xs"}>
            <Text c={"dimmed"} fz="xs">
              <strong>Reload</strong> will refresh the app. You may lose the progress, if any.
            </Text>
            <Text c={"dimmed"} fz="xs">
              <strong>Cancel</strong> will install the update next time you visit the app.
            </Text>
          </Stack>

          <Group mt={"xs"} justify="flex-end">
            <Button size="xs" c={"var(--mantine-color-text)"} variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button size="xs" onClick={() => updateServiceWorker(true)}>Reload</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default AppUpdateModal;
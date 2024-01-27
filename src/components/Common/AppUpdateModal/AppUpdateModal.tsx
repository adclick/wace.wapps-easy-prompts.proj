import { Button, Group, Modal, Text } from "@mantine/core";
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
        color: "blue",
      });
  }, [offlineReady]);

  return (
    <>
      <Modal
        opened={needRefresh}
        title="Install update"
        centered
        onClose={close}
      >
        <Text>A new app update is available.</Text>

        <Text c={"dimmed"} fz="xs" mt="sm">
          <strong>Reload</strong> will refresh the app. You may lose the
          progress, if any.
        </Text>
        <Text c={"dimmed"} fz="xs">
          <strong>Cancel</strong> will install the update next time you visit
          the app.
        </Text>

        <Group mt="lg">
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
        </Group>
      </Modal>
    </>
  );
};

export default AppUpdateModal;
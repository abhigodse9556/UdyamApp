import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import Button from "../ui/button";
import ModalDrawer from "../ui/modalDrawer";

type confirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
};
const Confirm = (props: confirmationModalProps) => {
  const {
    visible,
    onConfirm,
    onCancel,
    title = "Confirm",
    message = "Are you sure?",
  } = props;
  return (
    <ModalDrawer
      isVisible={visible}
      onClose={onCancel}
      style={styles.modalContainer}
    >
      <ThemedView
        lightColor="#ffffff"
        darkColor="#353636"
        style={styles.container}
      >
        <ThemedText type="title" style={styles.titleText}>
          {title}
        </ThemedText>
        <ThemedView style={styles.messageBox}>
          <ThemedText type="defaultSemiBold" style={styles.messageText}>
            {message}
          </ThemedText>
        </ThemedView>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            lightColor="red"
            darkColor="red"
            onPress={onConfirm}
            style={styles.button}
          />
          <Button
            title="Cancel"
            lightColor="#c0c5c9"
            darkColor="#c0c5c9"
            onPress={onCancel}
            style={styles.button}
          />
        </View>
      </ThemedView>
    </ModalDrawer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    marginTop: 10,
  },
  messageBox: {
    borderRadius: 10,
    marginTop: 6,
    elevation: 2,
  },
  messageText: {
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 10,
    marginTop: 10,
    gap: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    minWidth: 80,
  },
});

export default Confirm;

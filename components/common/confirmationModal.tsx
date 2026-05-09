import { Checkbox } from "expo-checkbox";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import Button from "../ui/button";
import { IconSymbol } from "../ui/icon-symbol";
import ModalDrawer from "../ui/modalDrawer";

//design from https://dribbble.com/shots/25383543-Dialog-design?utm_source=Clipboard_Shot&utm_campaign=Poorni12&utm_content=Dialog%20design&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Poorni12&utm_content=Dialog%20design&utm_medium=Social_Share
//design from https://dribbble.com/shots/23010827-Daily-UI-Challenge-9-Design-a-confirmation-popup
//design from https://dribbble.com/shots/26063092-Confirmation-modal
type confirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  type?: "warning" | "danger" | "success" | "info";
  giveDontShowCheck?: boolean;
};
const Confirm = (props: confirmationModalProps) => {
  const {
    visible,
    onConfirm,
    onCancel,
    title = "Confirm",
    message = "Are you sure?",
    type,
    giveDontShowCheck = false,
  } = props;
  const [checked, setChecked] = useState(false);
  const iconColor = useMemo(() => {
    switch (type) {
      case "warning":
        return "#fecd2e";
      case "danger":
        return "red";
      case "success":
        return "green";
      case "info":
        return "blue";
      default:
        return "#f2a601";
    }
  }, [type]);
  const buttonTextColor = useMemo(() => {
    switch (type) {
      case "warning":
        return "Black";
      case "danger":
        return "white";
      case "success":
        return "green";
      case "info":
        return "blue";
      default:
        return "#f2a601";
    }
  }, [type]);
  return (
    <ModalDrawer
      isVisible={visible}
      onClose={onCancel}
      style={styles.modalContainer}
    >
      <ThemedView
        lightColor="#ffffff"
        darkColor="#ffffff"
        style={styles.container}
      >
        <View
          style={[
            styles.iconOuterContainer,
            { backgroundColor: "#f9d1d1", borderRadius: 50 },
          ]}
        >
          <View
            style={[
              styles.iconInnerContainer,
              { backgroundColor: "#f7b2b2", borderRadius: 50 },
            ]}
          >
            <IconSymbol
              name="alert-circle"
              type="MaterialCommunityIcons"
              lightColor={iconColor}
              darkColor={iconColor}
              size={32}
            />
          </View>
        </View>
        <ThemedText
          lightColor="black"
          darkColor="black"
          type="title"
          style={styles.titleText}
        >
          {title}
        </ThemedText>
        <View style={styles.messageBox}>
          <ThemedText
            type="default"
            lightColor="black"
            darkColor="black"
            style={styles.messageText}
          >
            {message}
          </ThemedText>
        </View>
        <View style={styles.buttonContainer}>
          {giveDontShowCheck && (
            <View style={styles.checkboxContainer}>
              <Checkbox value={checked} onValueChange={setChecked} />
              <ThemedText lightColor="black" darkColor="black" type="default">
                Don&apos;t show again
              </ThemedText>
            </View>
          )}
          <Button
            title="Cancel"
            titleColor="#565656"
            titleStyle={{ fontWeight: "medium" }}
            lightColor="#ffffff"
            darkColor="#ffffff"
            onPress={onCancel}
            style={styles.button}
          />
          <Button
            title="Confirm"
            titleColor={buttonTextColor}
            titleStyle={{ fontWeight: "medium" }}
            lightColor={iconColor}
            darkColor={iconColor}
            onPress={onConfirm}
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
    // alignItems: "center",
    justifyContent: "center",
    width: 375,
    borderRadius: 18,
    padding: 20,
  },
  titleText: {
    marginTop: 10,
  },
  messageBox: {
    borderRadius: 10,
    // marginTop: 6,
    // elevation: 2,
  },
  messageText: {
    marginVertical: 10,
    // textAlign: "center",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconOuterContainer: {
    width: 44,
    height: 44,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconInnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 40,
  },
});

export default Confirm;

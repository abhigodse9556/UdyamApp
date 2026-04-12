import { View } from "react-native";
import Modal from "react-native-modal";

type ModalAnimation =
  | "slideInUp"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight"
  | "slideOutUp"
  | "slideOutDown"
  | "slideOutLeft"
  | "slideOutRight"
  | "fadeIn"
  | "fadeOut";

type ModalPropsType = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationIn?: ModalAnimation;
  animationOut?: ModalAnimation;
  animationInTiming?: number;
  animationOutTiming?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  style?: object;
};
const ModalDrawer = (props: ModalPropsType) => {
  const {
    isVisible,
    onClose,
    children,
    animationIn,
    animationOut,
    animationInTiming = 300,
    animationOutTiming = 300,
    backdropTransitionInTiming = 300,
    backdropTransitionOutTiming = 300,
    style = {},
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropTransitionInTiming={backdropTransitionInTiming}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0, padding: 0 }}
    >
      <View
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
          ...style,
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

export default ModalDrawer;

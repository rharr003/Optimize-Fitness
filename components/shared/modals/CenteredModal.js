import { Modal, StyleSheet, View, Pressable } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import { BlurView } from "expo-blur";

export default function CenteredModal({
  children,
  handleClose,
  showModal,
  style,
}) {
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <Pressable style={styles.flex1} onPress={handleClose}>
        <View style={styles.centeredView}>
          <Pressable style={[styles.container, style]}>{children}</Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "40%",
    backgroundColor: ColorPalette.dark.gray800,
    position: "absolute",
    borderRadius: 25,
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  flex1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.7)",
  },
});

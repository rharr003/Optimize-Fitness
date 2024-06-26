import CustomButton from "../../../../shared/ui/CustomButton";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateWorkoutDuration } from "../../../../../util/redux/slices/workout";
import { ColorPalette } from "../../../../../ColorPalette";

export default function FinishWorkoutButton({ handleOpenModal }) {
  const timer = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();
  function onPress() {
    dispatch(updateWorkoutDuration({ duration: timer }));
    handleOpenModal();
  }
  return (
    <View style={styles.centeredView}>
      <CustomButton
        onPress={onPress}
        title="Finish"
        iconName="checkmark-outline"
        style={styles.buttonStyle}
        textColor={ColorPalette.dark.secondary200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
  },
});

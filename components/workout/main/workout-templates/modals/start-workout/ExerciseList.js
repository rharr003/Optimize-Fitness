import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function ExerciseList({ exercises, workout }) {
  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => (
        <Text style={styles.text} key={Math.random()}>
          {index === 5 && exercises.length > 5
            ? `${exercise.name} \n +${workout.exercisesNew.length - 5} more`
            : `${exercise.name}`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: ColorPalette.dark.gray400,
    marginVertical: 5,
  },

  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "flex-start",
  },
});

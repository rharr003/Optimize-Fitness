import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  OpacityDecorator,
} from "react-native-draggable-flatlist";
import ExerciseMain from "./exercise/ExerciseMain";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseOrder } from "../../../../../util/redux/slices/workout";
import TouchableHeader from "./exercise/TouchableHeader";
import WorkoutFooter from "../footer/WorkoutFooter";
import * as Haptics from "expo-haptics";

export default function ExerciseList({ isFinishing, interval }) {
  const [dragIsActive, setDragIsActive] = useState(false);
  const exercises = useSelector((state) => state.workout.workout.exercises);
  const dispatch = useDispatch();
  function hapticDrag(drag) {
    // if there is only one exercise in the list then there is no need to drag also prevents a bug where if the user drags the only exercise in the list the that exercise will have broken touch events until the the whole list is re-rendered
    if (exercises.length > 1) {
      // lets the children exercises know that a drag is active so they can update the redux store with their current set state this causes extra re-renders but it is necessary to prevent the redux store from getting out of sync with the current set state
      setDragIsActive(true);
      //gives time for the children exercises to save currrent set state in the redux store before the drag starts
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        drag();
      }, 200);
    }
  }

  function Footer() {
    return <WorkoutFooter interval={interval} />;
  }

  // I had to customize the npm package to get this to work sometimes items would get stuck on top of each other if the drag was released too quickly I forced the drag end function in the package to run everytime regardless of if it thought the user had actually dragged an item.
  function handleDragEnd({ data }) {
    setDragIsActive(false);
    dispatch(updateExerciseOrder(data));
  }

  function handleRelease() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        data={exercises}
        autoscrollSpeed={200}
        autoscrollThreshold={25}
        ListFooterComponent={Footer}
        renderItem={({ item, getIndex, drag, isActive }) => (
          <OpacityDecorator>
            <TouchableHeader
              name={item.name}
              drag={drag}
              hapticDrag={hapticDrag}
              isActive={isActive}
            />
            <ExerciseMain
              key={item.id}
              exercise={item}
              index={getIndex()}
              dragIsActive={dragIsActive}
              isFinishing={isFinishing}
            />
          </OpacityDecorator>
        )}
        keyExtractor={(item) => `draggable-item-${item.reactId}`}
        onRelease={handleRelease}
        onDragEnd={handleDragEnd}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 0,
  },
});
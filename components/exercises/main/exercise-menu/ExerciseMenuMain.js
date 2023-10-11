import { View, StyleSheet, Keyboard } from "react-native";
import SearchBar from "./search-bar/SearchBar";
import { useState, useEffect } from "react";
import { fetchExercises } from "../../../../util/sqlite/db";
import { useIsFocused } from "@react-navigation/native";
import ExerciseListMain from "./exercise-list/ExerciseListMain";
import AddOrEditExerciseModalMain from "../../../shared/modals/add-or-edit-exercise/AddOrEditExerciseModalMain";
import { useDispatch, useSelector } from "react-redux";
import { setExercises } from "../../../../util/redux/slices/exercises";

export default function ExerciseMenuMain({
  onPress,
  uniqueSelected,
  onAddNewExercise,
  exerciseToReplaceInfo,
  selectedExercises = [],
}) {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [filteredExercises, setFilteredExercises] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState({ name: "", category: "" });

  useEffect(() => {
    async function fetch() {
      const result = await fetchExercises();
      dispatch(setExercises(result));
    }

    fetch();
  }, []);

  // allows us to have the exercises that is being replaced preselected
  useEffect(() => {
    if (exerciseToReplaceInfo?.id) {
      const newExercises = {
        ...exercises,
        [exerciseToReplaceInfo.letterGroup]: exercises[
          exerciseToReplaceInfo.letterGroup
        ].map((exercise) => {
          if (exercise.id === exerciseToReplaceInfo.id) {
            return { ...exercise, defaultSelected: true };
          } else {
            return exercise;
          }
        }),
      };
      dispatch(setExercises(newExercises));
      return;
    }
  }, [exerciseToReplaceInfo]);

  function handleAddModalOpen() {
    // clear search so that when the modal is closed, the newly added exercise will show up first
    setSearch({ name: "", category: "" });
    Keyboard.dismiss();
    setShowAddModal(true);
  }

  return (
    <View style={styles.container}>
      <AddOrEditExerciseModalMain
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onComplete={onAddNewExercise}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        exercises={exercises}
        setFilteredExercises={setFilteredExercises}
        handleAddModalOpen={handleAddModalOpen}
      />
      <ExerciseListMain
        search={search}
        exercises={exercises}
        filteredExercises={filteredExercises}
        uniqueSelected={uniqueSelected}
        selectedExercises={selectedExercises}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
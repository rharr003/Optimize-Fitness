import { View, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
import { fetchUserMetrics } from "../../../../util/sqlite/db";
import MeasurementEntry from "./MeasurementEntry";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { deleteUserMetric } from "../../../../util/sqlite/db";
import { useDispatch, useSelector } from "react-redux";
import {
  setTdee,
  setOverlayMessage,
} from "../../../../util/redux/slices/userData";
import calculateTdee from "../../../../util/calculateTdee";
import {
  setWeightMeasurements,
  deleteWeightMeasurement,
} from "../../../../util/redux/slices/userData";

export default function MeasurementListMain({ route }) {
  const { metric } = route.params;
  const measurements = useSelector(
    (state) => state.userData.weightMeasurements
  );
  // I think I can change this to a useRef but not sure why i used a shared value in the first place
  const activeIdx = useSharedValue(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const metrics = await fetchUserMetrics(metric.id);
      dispatch(setWeightMeasurements(metrics));
    }
    fetch();
  }, []);

  function renderItem({ item, index }) {
    return (
      <MeasurementEntry
        stat={item}
        unit={metric.unit}
        activeIdx={activeIdx}
        index={index}
        removeItem={removeItem}
      />
    );
  }

  function renderFooter() {
    return <View style={styles.listSpacerStyle} />;
  }

  async function removeItem(index) {
    const id = measurements[index].id;
    await deleteUserMetric(id);
    dispatch(deleteWeightMeasurement(index));
    if (index === 0) {
      const result = await calculateTdee();
      if (typeof result === "number") {
        dispatch(setTdee(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdee(0));
        dispatch(setOverlayMessage(result));
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={measurements}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          //use random key to reset shared values in StatDetailEntry
          return Math.random().toString();
        }}
        style={styles.listStyle}
        ListFooterComponent={renderFooter}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },

  listStyle: {
    width: "100%",
    height: "100%",
  },
  listSpacerStyle: {
    height: 50,
  },
});
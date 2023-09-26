import { View, Text, StyleSheet, Dimensions } from "react-native";
import { getWeeklyVolumePastSixWeeks } from "../../../../../util/sqlite/db";
import { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { ColorPalette } from "../../../../../ColorPalette";
import { useIsFocused } from "@react-navigation/native";
import {
  chartConfig,
  buildChartDataObj,
} from "../../../../../util/chart/home/weeklyVolume";
import { useDispatch, useSelector } from "react-redux";
import { setWeeklyVolumeLastSixWeeksData } from "../../../../../util/redux/widgets";

export default function WeeklyVolumeMain() {
  const weeklyVolume = useSelector(
    (state) => state.widgets.weeklyVolumeLastSixWeeksData
  );
  const isEmpty = weeklyVolume.every((item) => item.totalVolume === 0);
  const max = Math.max(...weeklyVolume.map((item) => item.totalVolume));
  const chartWidth = Dimensions.get("window").width - 20;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await getWeeklyVolumePastSixWeeks();
      dispatch(setWeeklyVolumeLastSixWeeksData(result));
    }
    fetch();
  }, []);

  const data = buildChartDataObj(weeklyVolume);
  const fromNumber = max > 5000 ? max : 5000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Volume (lbs):</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          withHorizontalLabels={!isEmpty}
          withVerticalLabels={!isEmpty}
          style={styles.chartOffset}
          fromNumber={fromNumber}
          fromZero={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  chartOffset: {
    marginLeft: -30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 28,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },
});
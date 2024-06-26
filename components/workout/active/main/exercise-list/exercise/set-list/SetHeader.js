import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../../../../../ColorPalette";
import CustomButton from "../../../../../../shared/ui/CustomButton";

export default function SetHeader({ handleModalToggle, unit, equipment }) {
  // adjust the layout of the table header to make sense for the type of exercise
  const useAltLayout = equipment === "static" || equipment === "body";
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCellExtraSmall, styles.tableHeaderText]}>
        Set
      </Text>
      <Text style={[styles.tableCellWide, styles.tableHeaderText]}>
        Previous
      </Text>
      {/* adjust the cells shown to make sense for the type of exercise */}
      {!useAltLayout && (
        <Text style={[styles.tableCellRegular, styles.tableHeaderText]}>
          Weight ({unit})
        </Text>
      )}

      <Text
        style={[
          useAltLayout ? styles.tableCellRegular : styles.tableCellSmall,
          styles.tableHeaderText,
        ]}
      >
        {/* adjust the cell name to make sense for the type of exercise */}
        {equipment === "static" ? "Time (sec)" : "Reps"}
      </Text>
      {/* <Pressable style={styles.tableCellExtraSmall} onPress={handleModalToggle}>
        <Ionicons
          name="ellipsis-horizontal-outline"
          size={26}
          color={"#FFFFFF"}
          style={styles.icon}
        />
      </Pressable> */}
      <CustomButton
        style={[styles.tableCellExtraSmall, styles.buttonStyle]}
        onPress={handleModalToggle}
        iconName={"ellipsis-horizontal-outline"}
        color={ColorPalette.dark.secondary200}
        size={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  tableCellExtraSmall: {
    flex: 1,
    textAlign: "center",
    margin: 5,
  },

  tableCellSmall: {
    flex: 2,
    margin: 0,
    textAlign: "center",
  },

  tableCellRegular: {
    flex: 3,
    margin: 5,
    textAlign: "center",
  },

  tableHeaderText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
  },

  tableCellWide: {
    flex: 4,
    margin: 5,
    textAlign: "center",
  },

  icon: {
    margin: 0,
    padding: 0,
    textAlign: "center",
  },

  buttonStyle: {
    padding: 0,
    paddingLeft: 5,
    marginRight: 0,
  },
});

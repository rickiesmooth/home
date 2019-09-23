import React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  onDelete: () => void;
  subTitle?: string;
} & ViewProps;

export const Card: React.FC<Props> = ({
  children,
  title,
  onDelete,
  subTitle
}) => (
  <View style={styles.thing}>
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title.toLowerCase()}</Text>
        <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
          <Ionicons name={"ios-trash"} size={26} />
        </TouchableOpacity>
      </View>
      {subTitle && (
        <Text numberOfLines={1} ellipsizeMode="tail">
          {subTitle}
        </Text>
      )}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  thing: {
    borderColor: "#EEE",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    maxWidth: 400,
    width: "100%",
    margin: 8
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingBottom: 16
  },
  title: {
    fontSize: 26
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  deleteIcon: {
    marginLeft: "auto"
  }
});
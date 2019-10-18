import React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  onDelete?: () => void;
  subTitle?: string;
} & ViewProps;

export const Card: React.FC<Props> = ({
  children,
  title,
  onDelete,
  subTitle
}) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title.toLowerCase()}</Text>
        <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
          <Text>Delete</Text>
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
  card: {
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 24,
    maxWidth: 400,
    width: "100%",
    margin: 8
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
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

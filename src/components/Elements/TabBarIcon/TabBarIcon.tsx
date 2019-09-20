import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const TabBarIcon: React.FC<{ name: string }> = ({ name }) => {
  return <Ionicons name={name} size={26} style={{ marginBottom: -3 }} />;
};

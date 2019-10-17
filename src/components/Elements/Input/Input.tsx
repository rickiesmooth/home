import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

export const Input = ({ style, ...rest }: TextInputProps) => (
  <TextInput style={[styles.input, style]} {...rest} />
);

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.08)"
  }
});

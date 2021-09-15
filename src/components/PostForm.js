import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export const PostForm = ({
  title: titleProps = "",
  content: contentProps = "",
  submitBtn = "Add",
  onSubmit,
}) => {
  const [title, setTitle] = useState(titleProps);
  const [content, setContent] = useState(contentProps);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button
        title={`${submitBtn} blog post`}
        onPress={() => onSubmit(title, content)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    padding: 8,
  },
});

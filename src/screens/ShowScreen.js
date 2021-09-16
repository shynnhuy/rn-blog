import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBlogPosts } from "../context/BlogContext";

export const ShowScreen = ({ route: { params }, navigation }) => {
  const { id } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit", { id })}>
          <Feather name="edit" size={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { state } = useBlogPosts();

  const post = state.posts.find((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { alignSelf: "center", fontWeight: "bold", fontSize: 20 },
  content: { marginTop: 8, fontSize: 18 },
});

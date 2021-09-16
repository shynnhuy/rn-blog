import React, { useLayoutEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { useBlogPosts } from "../context/BlogContext";

export const IndexScreen = ({ navigation }) => {
  const { state, removeBlogPost, fetchPosts } = useBlogPosts();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Feather name="plus" size={25} />
        </TouchableOpacity>
      ),
    });
    fetchPosts();
  }, [navigation]);

  const renderPost = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Show", { id: item.id })}
      style={styles.row}
    >
      <Text style={styles.title}>
        #{item.id} - {item.title}
      </Text>
      <TouchableOpacity onPress={() => removeBlogPost(item.id)}>
        <Feather style={styles.icon} name="trash" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ListEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Blog post is empty. Add some.
      </Text>
    </View>
  );

  if (state.loading) {
    return (
      <View>
        <Text>LOADING....</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={state.posts}
        keyExtractor={(posts) => `${posts.id}`}
        renderItem={renderPost}
        ListEmptyComponent={<ListEmpty />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

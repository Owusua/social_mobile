import { StyleSheet, Text, View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import React, { useState } from "react";
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-web";

const AddPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    addPost(title, body, Math.floor(Math.random() * 100));
    setTitle("");
    setBody("");
  };
  return (
    <View style={tw`flex flex-row`}>
      <View
        style={[
          tw`relative mr-4 h-8 w-8 rounded-full border-4`,
          styles.imageContainer,
        ]}
      >
        <Image
          style={[tw`cursor-pointer rounded-full bg-black`, styles.imageDesign]}
          source={{
            uri: "https://avatars.dicebear.com/api/pixel-art/brith.svg",
          }}
        />
      </View>
      <View style={tw`w-4/5`}>
        <Input
          placeholder="Enter Title of post"
          autoFocus
          type="text"
          name="title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Input
          placeholder="Write a post..."
          autoFocus
          type="text"
          name="body"
          onChangeText={(text) => setBody(text)}
          value={body}
        />
        <View style={[tw`ml-2`, { width: 100, height: 50 }]}>
          <Button raised onPress={handleSubmit} title="Add Post" />
        </View>
      </View>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  buttonStyle: {
    width: 100,
    marginTop: 10,
  },
  imageContainer: {
    borderColor: "#EC4899",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageDesign: {
    width: 24,
    height: 24,
  },
});

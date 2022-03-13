import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <View style={tw`pl-9 py-2`}>
      {comments.map((comment) => (
        <View key={comment.id} style={tw`mt-3 mb-4 flex flex-row pr-4`}>
          <View
            style={[
              tw`relative mr-4 h-8 w-8 rounded-full border-4`,
              styles.imageContainer,
            ]}
          >
            <Image
              style={[
                tw`cursor-pointer rounded-full bg-black`,
                styles.imageDesign,
              ]}
              source={{
                uri: `https://avatars.dicebear.com/api/pixel-art/${comment.email}.svg`,
              }}
            />
          </View>
          <View style={tw`flex pl-3`}>
            <Text style={tw`text-sm font-semibold`}>{comment.email}</Text>
            <Text style={tw`mb-1 text-xs`}>{comment.body}</Text>
            <Text style={tw`flex flex-row align-middle text-xs font-semibold`}>
              <Icon name="like2" color="blue" size="30" type="antdesign" /> 1
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
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

import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import Fade from "react-reveal/Fade";

const PostList = ({
  id,
  title,
  body,
  onEdit,
  onDelete,
  commentsOnPost,
  userId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const editPost = () => {
    onEdit(id, title, body);
  };
  const deletePost = () => {
    onDelete(id, userId);
  };
  const commentsShow = () => {
    if (showComments === false) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  return (
    <View key={id}>
      <View style={tw`flex flex-row py-4`}>
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
              uri: "https://avatars.dicebear.com/api/pixel-art/brith.svg",
            }}
          />
        </View>
        <View style={tw`w-full`}>
          <View style={tw`flex flex-row`}>
            <View style={tw`flex flex-grow`}>
              <Text style={tw`font-semibold`}>{title}</Text>
              <Text style={tw`w-full `}>{body}</Text>
            </View>
            <View style={tw`flex flex-row justify-end pr-8`}>
              <Icon
                name="edit"
                color="blue"
                type="antdesign"
                style={[tw`mr-3`, { cursor: "pointer" }]}
                onClick={editPost}
              />
              <Icon
                name="delete"
                color="red"
                type="antdesign"
                style={{ cursor: "pointer" }}
                onClick={deletePost}
              />
            </View>
            {/*<Button>Edit Post</Button>
            <Button>Delete Post</Button>*/}
          </View>

          <View style={tw`pt-2`}>
            <Text style={tw`text-base`}>
              <Icon name="like2" color="blue" size="30" type="antdesign" /> 2
              <Text
                style={[tw`pl-2`, { cursor: "pointer" }]}
                onClick={commentsShow}
              >
                Comments
              </Text>
            </Text>
            {showComments ? (
              <Fade bottom>
                <Comments id={id} />
              </Fade>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostList;

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

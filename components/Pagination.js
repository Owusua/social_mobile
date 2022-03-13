import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const Pagination = ({ postsOnPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsOnPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={tw`flex flex-row justify-center mt-6`}>
      {pageNumbers.map((number) => (
        <Text
          key={number}
          className="page-link"
          style={[tw`p-4 bg-white m-2`, styles.cursorPointer]}
        >
          <a
            onClick={() => paginate(number)}
            className={currentPage == number ? "page-link active" : "page-link"}
          >
            {number}
          </a>
          <style jsx>{`
            a.page-link.active {
              background-color: #d0d0d0;
              padding: 10px;
            }
          `}</style>
        </Text>
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  cursorPointer: {
    cursor: "pointer",
  },
});

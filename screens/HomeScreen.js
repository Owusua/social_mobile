import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-web";
import tw from "tailwind-react-native-classnames";
import AddPost from "../components/AddPost";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsOnPage, setPostsOnPage] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  const addPost = async (title, body, userID) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id === 11) {
          data.id = posts.length + 1;
        }
        setPosts((posts) => [data, ...posts]);
      });
  };

  const onEdit = (id, title, body) => {
    let titleNew = "";
    let bodyNew = "";
    Swal.fire({
      title: "Edit your post",
      html:
        `<textarea id="swal-input1" class="form-control mb-3">${title}</textarea>` +
        `<textarea id="swal-input2" class="form-control">${body}</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Edit",
      customClass: {
        content: "text-primary",
        confirmButton: "bg-primary",
        cancelButton: "bg-dark",
      },
      preConfirm: () => {
        console.log(
          "this is innerHTML",
          document.getElementById("swal-input1").value
        );
        titleNew = document.getElementById("swal-input1").value;
        bodyNew = document.getElementById("swal-input2").value;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            title: titleNew,
            body: bodyNew,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const newData = [...posts];
            console.log(data.id);
            newData[data.id - 1] = { title: data.title, body: data.body };
            setPosts(newData);
          });
      },
    });
  };

  const onDelete = (id, userId) => {
    console.log(userId, id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        );
      }
    });
  };

  const indexOfLastPost = currentPage * postsOnPage;
  const indexOfFirstPost = indexOfLastPost - postsOnPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <SafeAreaView style={[tw`h-full p-4`, styles.mainBackground]}>
      {/*<Text style={[tw`text-sm p-10`, styles.text]}>HomeScreen</Text>*/}
      <View style={styles.text}>
        <Text style={[tw`font-semibold p-6`, styles.headerShadow]}>
          The Social Page
        </Text>
      </View>
      <View style={[tw`p-12 mt-4`, styles.text]}>
        <AddPost addPost={addPost} />
        {currentPosts.map((current) => (
          <PostList
            id={current.id}
            body={current.body}
            title={current.title}
            userId={current.userId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </View>
      <View>
        <Pagination
          postsOnPage={postsOnPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: `#7DD3FC`,
  },
  text: {
    backgroundColor: "white",
  },
  /*headerShadow: {
    textShadow: `#D0D0D0 0.1em 0.1em 0.15em`,
  },*/
});

import "./posts-page.css";
// import { posts } from "../../dummyData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { categories } from "../../dummyData";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const PostsPage = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post)
    useEffect(() => {
      dispatch(fetchPosts(0));
    }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default PostsPage;

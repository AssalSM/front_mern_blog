import PostList from "../../components/posts/PostList";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
// import { categories } from "../../dummyData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);



  return (
    <section className="home">
       {/* <div className="home-hearo-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to english Blog</h1>
        </div>
  </div> */}
      {/*  <Sidebar categories={categories} />  */}
      <div className="home-latest-post">wait please</div>
      <div className="home-container">
       {!posts ? <> <h1>  wait</h1></>   : <PostList posts={posts} /> }  
        {/* <Sidebar categories={categories} /> */}
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;

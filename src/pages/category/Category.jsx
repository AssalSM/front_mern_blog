import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";

import "./category.css";
import {useDispatch,useSelector} from "react-redux"
import { fetchcategory } from "../../redux/apiCalls/postApiCall";
const Category = () => {
    const { category } = useParams();
const dispatch = useDispatch()
const {postsCate } = useSelector(state => state.post)
    useEffect(() => {
      dispatch(fetchcategory(category))
      window.scrollTo(0,0);
    }, [category]);

    return ( 
    <div className="category">
      {postsCate.length === 0 ? <>
        <h1 className="category-title"> not found Posts </h1>
      </> : <>
      <h1 className="category-title">Posts based on {category}</h1>
        <PostList posts={postsCate} />
      </> }
       
    </div> );
}
 
export default Category;
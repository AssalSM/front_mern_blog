import { Link } from "react-router-dom";
import "./posts.css";


const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <div className="post-item-info">
        <div  className="post-item-all-info">
         
          <div className="post-item-author">
          <img
            src={post?.user?.profilePhoto?.url}
            alt=""
            className="post-user-image"
          />
          <div>
            <Link to={`/profile/${post?.user?._id}`}>
              <span>{post?.user?.username}</span>
            </Link>
            <div className="post-itme-date">
              {new Date(post?.createdAt).toDateString()}
            </div>
          </div>
          </div>
          <Link
          className="post-item-category"
          to={`/posts/categories/${post?.category}`}
        >
          {post?.category}
        </Link>
         
        </div>
      </div>
      <div className="post-item-details">
        <h4 className="post-item-title">{post?.title}</h4>
       
      </div>
      <div className="post-item-image-wrapper">
        <img src={post?.image?.url} alt="" className="post-itme-image" />
      </div>
      <div className="post-item-info-wrapper">
        <p className="post-item-description">{post?.description}</p>
        <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
      </div>
      
    </div>
  );
};

export default PostItem;

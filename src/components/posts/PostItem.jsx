import { Link } from "react-router-dom";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { togglelikePosts } from "../../redux/apiCalls/postApiCall";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="post-item">
      <div className="post-item-info">
        <div className="post-item-all-info">
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
        <div className="reaction">
        
        <div className="likes">
          {user && (
            <i
              onClick={() => dispatch(togglelikePosts(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes?.length} likes</small>
        </div>
        <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
        </div>
        
        
      </div>
    </div>
  );
};

export default PostItem;

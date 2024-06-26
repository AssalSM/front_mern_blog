import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import AddComment from "../../components/comments/AddComment";
// import CommentList from "../../components/comments/CommentList";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

import "./post-details.css";
import UpdatePostModal from "./UpdatePostModal";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSinglePosts,
  updatePostsimage,
  togglelikePosts,
  deletePost,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const { id } = useParams();

  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePosts(id));
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostsimage(formData, post?._id));
  };

  const navigate = useNavigate();
  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal("Something went wrong!");
      }
    });
  };
  const shareUrl = 'https://assal-as.surge.sh/'

  return (
    <div className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label className="update-post-image" htmlFor="file">
              <i className="bi bi-image-fill"></i> select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-icon-wrapper">
        <div>
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

        <div className="flex  ">
          {user?._id === post?.user?._id && (
            <div>
              <i
                onClick={() => setUpdatePost(true)}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
            </div>
          )}
          <div  className="icon-share">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
      {/* <AddComment />*/}
      {/*  <CommentList comments={post?.comments} /> */}
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </div>
  );
};

export default PostDetails;

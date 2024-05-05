import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
//get profile user
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//upload profile photo
export function uploadProfilePhoto(newphto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/prfile-photo-upload`,
        newphto,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfile(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);
      // local modify
      const user = JSON.parse(localStorage.getItem("userinfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userinfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



//update  profile 
export function updateProfile(userId,profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token
          },
        }
      );
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));
      toast.success(data.message);
      // local modify
      const user = JSON.parse(localStorage.getItem("userinfo"));
      user.username = data?.username;
      localStorage.setItem("userinfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

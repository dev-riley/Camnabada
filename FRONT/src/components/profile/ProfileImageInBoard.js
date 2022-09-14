import React from "react";
import ProfileDefaultImage from "../../img/dog.png";
import CampingDefaultImage from "../../img/CampingDefaultImage.png";

const ProfileImageInBoard = ( { loginUserProfile } ) => {
  // console.log('프로필이미지js에서 사진 정보:', loginUserProfile)
  // console.log('사진 url만:', userInfo[0].photo.files[0])

  // const fileReader = new FileReader();
  // fileReader.readAsDataURL(userInfo[0].photo);
  // const url = fileReader.result;
  

  if (loginUserProfile == null || loginUserProfile === 'string' || loginUserProfile === 'null' ) {
    return (
      <img src={ProfileDefaultImage} width="100%" alt="ProfileDefaultImage"></img>
    )} else {
      return (
        // <img src={ProfileDefaultImage} width="100%" alt="ProfileDefaultImage"></img>
        <img src={loginUserProfile} width="100%" alt="CampingDefaultImage"></img>
        // <img src={CampingDefaultImage} width="100%" alt="CampingDefaultImage"></img>
      )

    }
  
}

export default ProfileImageInBoard;
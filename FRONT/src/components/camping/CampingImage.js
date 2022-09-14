import React, { Component } from "react";
import CardMedia from '@mui/material/CardMedia';
import CampingDefaultImage from "../../img/CampingDefaultImage.png";


const CampingImage = ({ basics }) => {
  if (basics.firstImageUrl !== null) {
    return (
      <CardMedia
        component="img"
        sx={{
          pt: '0%',
        }}
        image={basics.firstImageUrl}
        alt="CampingImage"
      />
    )
  } else {
      return (
        <img src={CampingDefaultImage} width="100%" alt="campingDefaultImage"></img>
      )
  }
}

export default CampingImage;
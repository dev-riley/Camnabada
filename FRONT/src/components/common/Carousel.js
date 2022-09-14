import React, { Component } from "react";
import { Grid } from '@mui/material';
import Slider from "react-slick";
import image10 from "../../img/campingImg/camping10.png"

export default class LazyLoad extends Component {
  render() {
    const settings = {
      lazyLoad: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 2,
      autoplay : true,
      autoplaySpeed : 2000,
    };

    const imgStyle={
      display: "inline-block",
      backgroundSize : "150px",
      width : "100%",
      height : "80%",
      maxWidth : "500px",
      maxHeight : "auto",
    }
    
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div style={imgStyle}>
            <img src={image10} alt="camping1" />
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
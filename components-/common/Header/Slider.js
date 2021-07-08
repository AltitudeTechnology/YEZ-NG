
// import Head from 'next/head'
import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
} from 'reactstrap';

const items = [
  {
    id: 1,
    altText: '',
    caption: 'Youth',
    src :'/static/images/home-slider/11.jpg'
  },
  {
    id: 2,
    altText: '',
    caption: 'Empowerment',
    src : '/static/images/home-slider/22.jpg'
  },
  {
    id: 3,
    altText: '',
    caption: 'Zone',
    src :  '/static/images/home-slider/33.jpg'
  }
];

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
          style={item.style}
        >
          {/* <img src={item.src} alt={item.altText} style={{width : '100%', height : '100%'}} /> */}
          <div  style={{width : '100%', height : '100%',
            background: `rgba(0, 0, 0, 0) url("${item.src}") no-repeat scroll center top / cover`
           }} />
          {/* <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} /> */}
          {/* <CarouselCaption className="slider-caption-text" captionHeader={item.caption} /> */}
          {/* <div className='slider-caption-text'></div>
          <style global jsx>{`
            .slider-caption-text h3{
              color: red;
            }
          `}</style> */}
        </CarouselItem>
      );
    });

    return (
      <div className="slider-wrapper text-center">
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background: black;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          pause={false}
          ride={'carousel'}
          // interval={4000}
        >
          {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
          {slides}
          {/* <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} /> */}
        </Carousel>
        <img className="slider-overlay" src={"/static/images/home-slider/overlay.png"} alt={'YEZ'}/>

        {/* <div className="custom-tag slider-overlay" style={{width : '100%', height : '100%', */}
        {/* // <div className="custom-tag slider-overlay" style={{width : '100%', height : '100%', */}
        {/* //   background: `rgba(0, 0, 0, 0) url("/static/images/home-slider/overlay.png") no-repeat scroll center top / cover`}}></div> */}
          <style jsx>{`
            .slider-wrapper {
              width: 100%;
              height: auto;
              position: relative;
            }
            .carousel,
            .slider-overlay {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .slider-overlay:hover {
              transform: scale(1.2);
              -moz-transform: scale(1.2);
              -webkit-transform: scale(1.2);
              -o-transform: scale(1.2);
              -ms-transform: scale(1.2);
              /* -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=1.5, M12=0, M21=0, M22=1.5, SizingMethod='auto expand')"; */
            }
            .slider-overlay {
              z-index: 10;
              position: absolute;
               top: 50%;
               left: 50%;
               height : 250px;
               width : 400px;
               margin-top: -125px; /* Half the height */
               margin-left: -200px; /* Half the width */
               transition: all 1s ease;
              -moz-transition: all 1s ease;
              -ms-transition: all 1s ease;
              -webkit-transition: all 1s ease;
            }
            @media (max-width: 500px) {
              .slider-overlay {
                height : 220px;
                width : 320px;
                margin-top: -110px; /* Half the height */
                margin-left: -160px; /* Half the width */
              }
            }
            @media (max-width: 320px) {
              .slider-overlay {
                height: 210px;
                width: 280px;
                margin-top: -105px;
                margin-left: -140px;
              }
            }
          `}</style>
      </div>
    );
  }
}

export default Slider;

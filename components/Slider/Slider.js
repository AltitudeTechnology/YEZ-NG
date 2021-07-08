// import Head from 'next/head'
import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
} from 'reactstrap';
import StyledSliderOverlayImage from './StyledSliderOverlayImage'
import StyledSliderWrapper from './StyledSliderWrapper'

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
          <div  style={{width : '100%', height : '100%',
            background: `rgba(0, 0, 0, 0) url("${item.src}") no-repeat scroll center top / cover`
           }} />
        </CarouselItem>
      );
    });

    return (
      <StyledSliderWrapper>
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
          {slides}
        </Carousel>
        <StyledSliderOverlayImage />
          <style jsx>{`
            .carousel {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          `}</style>
      </StyledSliderWrapper>
    );
  }
}

export default Slider;

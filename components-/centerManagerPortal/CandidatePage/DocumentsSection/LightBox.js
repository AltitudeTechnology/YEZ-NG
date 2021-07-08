import { Component } from 'react'
import Lightbox from 'react-image-lightbox'

export default class LightBox {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    const { images, photoIndex, closeBox } = this.props;
    return(
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => this.setState({ isOpen: false })}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length,
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % images.length,
          })
        }
      />
    )
  }
}

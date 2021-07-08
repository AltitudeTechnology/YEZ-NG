import { Component} from 'react'
import Head from 'next/head'
import { Row, Col} from 'react-bootstrap'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Link from 'next/link'
// import FactSlider from './FactSlider'


const styles = {
  container: {
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
  }
}



export default class YouthOpinion extends Component{

    constructor(props) {
    super(props);
  }

  render(){

    return(
      <section style={{
        borderTop: '1px inset red',
        borderBottom: '5px inset #AB0000',
        backgroundColor : '#F6F8FA' 
      }}>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        </Head>
          <Row style={{backgroundColor: '#F6F8FA', color: 'black'}}>
            <Col md={3}>
              <div style={{textAlign: 'left', padding: '0px 30px',
                height: '100%',
                background : '#E53735',
                margin: 'auto',
                position: 'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                right: '0'
              }}>
                <h1 style={{marginTop : '18%', color : '#FFFFFF', textAlign : 'center', fontSize : '70px'}}>YOUTH FIRST</h1>
              </div>
            </Col>
            <Col md={9}>
              <div style={{textAlign: 'left', padding: '30px'}}>
                 <div>
                    <h1 style={{color: 'black', textAlign: 'center', paddingBottom: '10px' , fontSize : '70px'}}>99% of Nigerian Youths believe in a better future</h1>
                  </div>
              </div>
              {/* <FactSlider/> */}
              <Row style={{
                  background : '#09123A' ,
                  height : '40px'
              }}>
                  <p style={{margin : 'auto' , color : '#FFFFFF'}}>
                    To Participate in our Weekly National Polls, Click 
                     <a href="/contact" style={{
                         textDecoration : 'none' ,
                         fontWeight : 'bolder'
                     }}>&nbsp;HERE</a>
                    <style jsx>{`
                        a:hover{
                            color : '#FFF'
                        }
                     `}</style>
                  </p>
              </Row>
            </Col>
          </Row>
      </section>
    )
  }
}

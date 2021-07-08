//import { Grid, Row, Col} from 'react-bootstrap'

const Steps = (props) => {
    return (

    <section className="about-area section-padding" style={{
        paddingBottom : '0px',
        paddingTop : '0px'
    }}>
        <div className="container-fluid" style={{
                    backgroundColor : '#E7EFF1'
                }}>
                <h2 style={{
                    paddingTop : '50px',
                    textAlign : 'center',
                    fontSize : '50px'
                }} >Our Steps</h2>
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <div className="service-content">
                        <div className="service-title">
                            <h3>Step 1</h3>
                        </div>
                        <i className="fa fa-child" aria-hidden="true"></i>
                        <p>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor.</p>
                        <a href="#" className="donate-btn more-btn hvr-shutter-out-horizontal">join us</a>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div className="service-content">
                        <div className="service-title">
                            <h3>Step 2</h3>
                        </div>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <p>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor.</p>
                        <a href="#" className="donate-btn more-btn hvr-shutter-out-horizontal">JOIN US</a>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="service-content mobile-auto">
                        <div className="service-title">
                            <h3>Step 3</h3>
                        </div>
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <p>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor.</p>
                        <a href="#" className="donate-btn more-btn hvr-shutter-out-horizontal">join us</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
  }
  export default Steps

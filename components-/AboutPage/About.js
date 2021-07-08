import Services2 from "../common/Widgets/Services2";
import Sectors2 from "../common/Widgets/Sectors2";

//import { Grid, Row, Col} from 'react-bootstrap'

const About = (props) => {
    return (
        <div>
            <section className="page-title-area parallax">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            
                            <div className="page-title">
                                <div className="title">
                                    <h2>About YEZ</h2>
                                </div>
                                <ul className="breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li>YEZ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="about-left">
                                
                                <div className="about-info">
                                    <div className="about-img">
                                        <img src="/static/img/about/about.png" alt=""/>\ 
                                    </div>
                                    <div className="about-details">
                                        <h2><a href="#">Sub Title</a></h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat qui ducimus illum modi? Libero saepe perspiciatis accusamus soluta perferendis, ad illum, nesciunt, reiciendis iusto et cupiditate. Repudiandae provident, consectetur, sapiente, libero iure necessitatibus corporis nulla voluptate, quisquam aut eum perspiciatis?</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat qui ducimus illum modi? Libero saepe perspiciatis accusamus soluta perferendis, ad illum, nesciunt, reiciendis iusto et cupiditate.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat qui ducimus illum modi? Libero saepe perspiciatis accusamus soluta perferendis, ad illum, nesciunt, reiciendis iusto et cupiditate. Repudiandae provident, consectetur, sapiente, libero iure necessitatibus.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="related-causes">
                                <h2>SUB TITLE</h2>
                                
                                <div className="related-about-info">
                                    
                                    <div className="related-causus-details">
                                        <h2>subtitle1</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam quas, quidem totam, fuga iste et voluptatem tempora molestiae ipsa. Similique voluptates mollitia.</p>
                                    </div>
                                </div>
                                
                                <div className="related-about-info">
                                    <div className="related-causus-details">
                                        <h2>subtitle2</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam quas, quidem totam, fuga iste et voluptatem tempora molestiae ipsa. Similique voluptates mollitia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            
                            <Services2 />

                            <Sectors2 />
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
  }
  export default About
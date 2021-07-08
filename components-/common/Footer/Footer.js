import CallToAction from "./CallToAction";

const Footer = (props) => {
  const { noDonate } = props;
  return (
    <div>
      {!noDonate && <CallToAction />}
    <footer className="footer-area parallax">
    <div className="top-footer-area section-padding">
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="footer-widgets">
                        <h2>Head Office</h2>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod temporia.</p>
                        <ul>
                            <li><i className="fa fa-phone" aria-hidden="true"></i> <a href="#">+256-4516-556</a></li>
                            <li><i className="fa fa-envelope" aria-hidden="true"></i> <a href="#">support@beieved.com</a></li>
                            <li><i className="fa fa-map-marker" aria-hidden="true"></i> 100 Main St, Blacktown NSW 2148, Australia</li>
                        </ul>
                        <div className="footer-social-link">
                            <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="footer-widgets">
                        <h2>quick links</h2>
                        <ul>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Our Recent Project</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Latest Blog</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Terms of Use</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>About Our Company</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>latest Project</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>helping hand</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Contact With Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="footer-widgets ">
                        <h2>Useful Pages</h2>
                        <ul>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Our Recent Project</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Latest Blog</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Terms of Use</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>latest Project</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>helping hand</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>About Our Company</a></li>
                            <li><a href="#"><i className="fa fa-angle-right"></i>Contact With Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="footer-widgets m-unset">
                        <h2>Photo Gallery</h2>
                        <ul className="list">
                            <li><a href="img/gallery/01.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/01.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/02.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/02.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/03.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/03.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/04.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/04.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/05.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/05.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/06.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/06.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/07.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/07.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/08.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/08.jpg" alt="#"/></a></li>
                            <li><a href="img/gallery/03.jpg" data-lightbox="example-set" data-title="believed"><img src="img/gallery/03.jpg" alt="#"/></a></li>
                        </ul>
                        <div className="subscribe-box">
                            <input type="text" placeholder="subscribe here"/>
                            <button type="submit" className="donate-btn more-btn hvr-shutter-out-horizontal"><i className="fa fa-send"></i>sent</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="main-footer-area">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 text-center">
                    <div className="copy-right">
                        <p>
                            Copyright &copy; 2018 - KTT YEZ. All rights reserved | Powered by <a href="#" target="_blank"> Altitude Technology </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
    </div>
  )
}
export default Footer

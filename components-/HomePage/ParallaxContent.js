const ParallaxContent = (props) => {
    return (
        <div>
            <section className="donate-count-area section-padding parallax">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-md-offset-0">
                            <div className="donate-info">
                                <h2>Stop Unemployment in Nigeria</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <a href="#" className="donate-btn more-btn hvr-shutter-out-horizontal">Get Involved</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="skill-progress-bar">
                                <div id="bar1" className="barfiller">
                                    <div className="tipWrap">
                                        <span className="tip"></span>
                                    </div>
                                    <span className="fill" data-percentage="90"></span>
                                </div>
                            </div>
                            <div className="progress-info">
                                <h3>40 Million Jobs in 4 years</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ParallaxContent
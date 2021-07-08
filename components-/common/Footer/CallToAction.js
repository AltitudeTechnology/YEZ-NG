const CallToAction = (props) => {
    return (
        <section className="call-to-action">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="call-to-main">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</h2>
                        </div>
                    </div>
                    <div className="col-md-3 text-right">
                        <div className="donate-call">
                            <a href="#" className="donate-btn more-btn hvr-shutter-out-horizontal"><i className="fa fa-send"></i>donate now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
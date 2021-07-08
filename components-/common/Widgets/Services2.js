const Services2 = (props) => {
    return (
        <div className="sidebar-widget">
            <div className="widget-title">
                <h2>Services</h2>
            </div>
            <ul>
                <li><a href="#"><i className="fa fa-angle-right" color='red'></i> Career Advice</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Internship</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Training</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Entrepreneurship</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Community Action</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Employment</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Scholarship</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Competitions</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Seminars</a></li>
            </ul>
            <style jsx>{`
                {
                    ul li a i {
                        color : red
                        font-weight : bold
                        margin-left : 10px 
                    }
                }
            `}
            </style>
        </div>
    )
}

export default Services2
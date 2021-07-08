import { Component } from 'react'
import withLayout from '../hocs/withLayout'
import Whatwedo from '../components/HomePage/Whatwedo'
import BlogSection from '../components/HomePage/BlogSection'
import SectorsSection from '../components/HomePage/SectorsSection'
import EducationSection from '../components/HomePage/EducationSection'
// import Steps from '../components/HomePage/Steps'
// import YouthOpinion from '../components/HomePage/YouthOpinion'
import Slider from '../components/common/Header/Slider'
// import ParallaxContent from '../components/HomePage/ParallaxContent'
import ChoiceContent from '../components/ChoiceContent/ChoiceContent'
import MapSection from '../components/HomePage/MapSection'
// import Sector from '../components/HomePage/Sector'
import Services from '../components/common/Widgets/Services'
// import ChoiceContentImageLeft from '../components/ChoiceContent/ChoiceContentImageLeft';


class HomePage extends Component{
  render(){
    return(
      <div>
        <Slider />
        <div className="container">
          <div className="row" style={{marginBottom : '0px', paddingBottom : '0px'}}>
            <div className="col-md-8">
              <Whatwedo />
              {/* <ChoiceContent />
              <ChoiceContent />
              <ChoiceContent />
              <ChoiceContent /> */}
            </div>
            <div className="col-md-4">
              <Services />
            </div>
          </div>
        </div>

        <BlogSection />
        <MapSection />
        <SectorsSection />
        <ChoiceContent />
        <EducationSection />
        {/* <Steps /> */}
        {/* <YouthOpinion /> */}
        {/* <Sector /> */}
        {/* <ParallaxContent /> */}
      </div>
    )
  }
}

export default withLayout(HomePage, {activePage: '/'})

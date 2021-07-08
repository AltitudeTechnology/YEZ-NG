import { Component } from 'react'

import Layout from '../components/layout/Layout';
import Slider from '../components/Slider'

import StyledTitle from '../components/styled/StyledTitle'

class HomePage extends Component{
  render(){
    return(
      <Layout>
        <Slider />
        <StyledTitle>WHO WE ARE</StyledTitle>
        <div>
          /a
        </div>
      </Layout>
    )
  }
}

export default HomePage
// export default withLayout(HomePage)

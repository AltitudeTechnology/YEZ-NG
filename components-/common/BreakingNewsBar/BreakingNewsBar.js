import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row, Col } from 'reactstrap'
//import Marquee from 'react-text-marquee'

const BreakingNewsBar = (props) => {
  //const newsMany = props.data.newsMany || [],
  const articles = props.articles || [];
  //combining articles from the411ng and ktt backend
  let allItems = [...articles];
  //let allItems = [...newsMany,...articles];
  allItems.sort(function(a, b) {
    a = new Date(a.publishedDate || a.createdAt);
    b = new Date(b.publishedDate || b.createdAt);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  //select the first 10 items most recent items only
  //console.log(allItems);
  allItems = allItems.slice(0, 10);

  return (
    <Container style={{
      width: '100%',
      maxWidth: '100%',
      margin: '0',
    }}>
      <Row>
        <Col md={2}
          style={{
            backgroundColor: '#DC3545',
            paddingTop: '8px',
            fontSize: '17px',
            color: 'white',
          }}>
          BREAKING NEWS
        </Col>
        <Col md={10} id="news-bar"
          style={{
            borderBottom: '2px solid #DC3545',
            borderTop: '1px solid #DC3545',
            backgroundColor: '#eeeef3',
            paddingLeft: '0px',
            paddingRight: '0px',
            color : '#DC3545'
          }}>
          <marquee direction="left" scrollamount="6" behavior="scroll" /*onmouseover="this.stop()" onmouseout="this.start()"*/>
            {allItems.map((item, index)=>(
              <span key={index}>
                <a href={item.link || "/article"} target={item.link? "_blank" : ""} className="hvr-pop" style={{color:'red'}}>{item.title}</a><a style={{color:'red'}}> **** </a>
              </span>
            ))}
            {/*{newsMany.map((news, index)=>(
              <span key={index}>
                <a href="/article" className="hvr-pop" style={{color:'red'}}>{news.title}</a><a style={{color:'red'}}> **** </a>
              </span>
            ))}
            {articles.map((article, index)=>(
              <span key={index}>
                <a href={article.link} className="hvr-pop" style={{color:'red'}}>{article.title}</a><a style={{color:'red'}}> **** </a>
              </span>
            ))}*/}
            </marquee>
        </Col>
      </Row>
    </Container>
  )
}
//export default BreakingNewsBar

const gqlWrapper = gql `
query rootQuery{
  newsMany(limit: 10, filter: {isBreaking: true}, sort:CREATEDAT_DESC) {
    title
    state
    createdAt
  }
}
`
// export default graphql(gqlWrapper, {
//   props: ({ data }) => ({
//     data
//   })
// })(BreakingNewsBar)

export default BreakingNewsBar

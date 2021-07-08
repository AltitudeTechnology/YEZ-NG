import {Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default props => (
  <Breadcrumb>
    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
    <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
    <BreadcrumbItem active>Data</BreadcrumbItem>
  </Breadcrumb>
)

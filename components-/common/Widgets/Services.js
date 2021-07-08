import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Link from 'next/link'

class Services extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
          <section className="section-padding">
            {/* <!-- single sidebar --> */}
            <aside className="sidebar-widget">
                <div className="widget-title recent-widget">
                    <h2>RECENT JOBS</h2>
                </div>
                {[...Array(6).keys()].map(item=>(
                  <a href="#">
                    <div className="post">
                      <div className="post-img">
                        <img src="/static/img/recent/01.jpg" alt=""/>
                      </div>
                      <div className="post-info">
                        <h3>white leg shrimp</h3>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <p>October 18, 2018</p>
                      </div>
                    </div>
                  </a>
                ))}
            </aside>
            {/* <div className="container" style={{paddingTop : '50px'}}>
                <h2 className="title" style={{paddingBottom : '10px'}}>Our Services</h2>
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-primary">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/career-advice">
                        <a>CAREER ADVICE</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/internship">
                        <a>INTERNSHIP</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-primary">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">TRAINING</h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/entrepreneurship">
                        <a>ENTREPRENEURSHIP</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-primary">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/community-action">
                        <a>Community-Action</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/employment">
                        <a>EMPLOYMENT</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-primary">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/scholarship">
                        <a>Scholarship</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/competition">
                        <a>Competition</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-primary">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        <Link href="/services/seminars">
                        <a>Seminars</a>
                        </Link>
                        </h5>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small class="text-muted">Donec id elit non mi porta.</small>
                    </a>
                </div>
            </div> */}            
        </section>
    );
  }
}

export default Services;

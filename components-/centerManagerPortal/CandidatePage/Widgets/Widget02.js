import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter} from 'reactstrap';
import classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  scrollToRef: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  icon: "fa fa-cogs",
  color: 'primary',
  variant: "0",
  link: "#",
  // scrollToRef: "#"
};

class Widget02 extends Component {
  render() {
    const {className, cssModule, header, mainText, icon, color, footer, link, scrollToRef, children, variant, ...attributes } = this.props;

    // demo purposes only
    const padding = (variant === '0' ? {card: "p-3", icon: "p-3", lead: "mt-2"} : ( variant === "1" ? {
      card: "p-0", icon: "p-4", lead: "pt-3" } : {card: "p-0", icon: "p-4 px-5", lead: "pt-3"}));

    const card = {style: "clearfix", color: color, icon: icon, classes: ""};
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = {style: "h5 mb-0", color: color, classes: ""};
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'bg-' + card.color, padding.icon, "font-2xl mr-3 float-left");
      return (
        <div>
          <i className={ classes }></i>
          <style jsx>{`
            i {
              color: white;
            }
          `}</style>
        </div>
      );
    };

    const getHoverColor = (color) => {
      let hoverColor = 'rgba(32, 168, 216, 0.25)';
      color=='info' && (hoverColor = 'rgba(99, 194, 222, 0.25)');
      color=='primary' && (hoverColor = 'rgba(32, 168, 216, 0.25)');
      color=='danger' && (hoverColor = 'rgba(248, 108, 107, 0.25)');
      color=='teal' && (hoverColor = 'rgba(32, 201, 151, 0.25)');
      return hoverColor;
    }

    const cardFooter = function () {
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            <a className="font-weight-bold font-xs btn-block text-muted" href={link}>View More
              <i className="fa fa-angle-right float-right font-lg"></i></a>
          </CardFooter>
        );
      }
    };

    return (
      <Card>
        {scrollToRef ? (
          <a onClick={()=>this.props.scrollTo(scrollToRef)}>
            <CardBody className={ card.classes } {...attributes}>
              { blockIcon(card.icon) }
              <div className={ lead.classes }>{ header }</div>
              <div className="text-muted text-uppercase font-weight-bold font-xs">{ mainText }</div>
            </CardBody>
            { cardFooter() }
          </a>
        ) : (
          <div>
            <CardBody className={ card.classes } {...attributes}>
              { blockIcon(card.icon) }
              <div className={ lead.classes }>{ header }</div>
              <div className="text-muted text-uppercase font-weight-bold font-xs">{ mainText }</div>
            </CardBody>
            { cardFooter() }
          </div>
        )}
        <style jsx>{`
          a:hover {
            box-shadow: 0 0 0 0.2rem ${getHoverColor(color)};
          }
        `}</style>
      </Card>
    )
  }
}

Widget02.propTypes = propTypes;
Widget02.defaultProps = defaultProps;

export default Widget02;

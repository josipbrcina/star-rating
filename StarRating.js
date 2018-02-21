import React, { PropTypes, Component } from 'react';

class StarRating extends Component {
  constructor(props, context) {
    super(props, context);
    this.rating = Math.round(this.props.rating);
    this.tempRating = this.rating;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.rating !== this.rating) {
      this.rating = Math.round(nextProps.rating);
      this.tempRating = this.rating;
    }
  }
  onMouseOver(value) {
    this.tempRating = value;
    this.forceUpdate();
  }
  onMouseLeave() {
    this.tempRating = this.rating;
    this.forceUpdate();
  }
  onClick(value) {
    this.rating = value;
    this.tempRating = value;
    this.props.onClickCb(value);
    this.forceUpdate();
  }
  render() {
    const stars = [];

    for (let i = 1; i < 6; i += 1) {
      let cssClass = 'fa fa-star fa-5x';

      if (this.tempRating >= i && this.tempRating !== null) {
        cssClass += ' fa-star-gold';
      }

      stars.push(<i
        key={i}
        className={cssClass}
        aria-hidden="true"
        onMouseOver={() => {
          this.onMouseOver(i);
        }}
        onMouseLeave={() => {
          this.onMouseLeave();
        }}
        onClick={() => {
          this.onClick(i);
        }}
      />);
    }

    return (
      <div>
        {stars}
      </div>
    );
  }
}

StarRating.defaultProps = {
  rating: 0,
  onClickCb: () => {},
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onClickCb: PropTypes.func.isRequired,
};

export default StarRating;

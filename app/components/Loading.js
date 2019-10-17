import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    left: 0,
    right: 0,
    position: "absolute",
    marginTop: "20px",
    textAlign: "center"
  }
};

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text
    };
  }
  componentDidMount() {
    const { text, speed } = this.props;
    this.intervalId = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300
};

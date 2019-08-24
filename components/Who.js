import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const RED = "#ff1814";
const BLUE = "#1700ff";
const GRAY = "#373737";

const MAX_WIDTH = 800;

const Wrapper = styled.div`

`;

const Canvas = styled.canvas`
`;

class Who extends React.Component {

  state = {
    size: 0,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.frame = 0;

    this.circles = [{
      delay: 0,
      radius: 0.2,
      offset: 0.2 * Math.PI * 2,
      to: 0.75 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 100,
      strokeStyle: RED,
      lineWidth: 60,
    }, {
      delay: 40,
      radius: 0.3,
      offset: 0.1 * Math.PI * 2,
      to: 0.33 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 160,
      strokeStyle: RED,
      lineWidth: 20,
    }, {
      delay: 80,
      radius: 0.3,
      offset: 1.5 * Math.PI * 2,
      to: 0.33 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 120,
      strokeStyle: BLUE,
      lineWidth: 40,
    }, {
      delay: 120,
      radius: 0.4,
      offset: 0.3 * Math.PI * 2,
      to: 0.4 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 200,
      strokeStyle: GRAY,
      lineWidth: 20,
    }];

    this.texts = [{
      string: '626 HACKERS',
      fontSize: 22,
      fillStyle: 'white',
      radius: 0.185,
      offset: 0.67 * Math.PI * 2,
    }];

    this.innerCircle = {
      fillStyle: GRAY,
      radius: 0.14,
    };
  }

  componentDidMount() {
    let size = Math.min(window.innerWidth, MAX_WIDTH);
    this.setState({ size })
    setTimeout(this._loop, 1);
  }

  _drawTextAlongArc(text, ctx, centerX, centerY, angle) {
    let s;
    let radius = text.radius * this.state.size;
    let rotationOffset = (this.frame / 200) + text.offset;

    ctx.font = `${text.fontSize * this.state.size / 500}px Baumans`;
    ctx.textAlign = 'center';
    ctx.fillStyle = text.fillStyle;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationOffset + -1 * angle / 2);
    ctx.rotate(-1 * (angle / text.string.length) / 2);
    for(var n = 0; n < text.string.length; n++) {
      ctx.rotate(angle / text.string.length);
      ctx.save();
      ctx.translate(0, -1 * radius);
      s = text.string[n];
      ctx.fillText(s, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  _drawInnerCircle = (ctx, innerCircle) => {
    // Scale to window size:
    let radius = innerCircle.radius * this.state.size;

    ctx.fillStyle = innerCircle.fillStyle;
    ctx.beginPath();
    ctx.arc(
      this.state.size / 2,
      this.state.size / 2,
      radius,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  _drawCircle = (ctx, circle) => {
    // Wait for delay:
    if (circle.delay > this.frame) return;

    // Scale to window size:
    let radius = circle.radius * this.state.size;
    let lineWidth = circle.lineWidth * this.state.size / 1000;

    let to;
    let rotationOffset = this.frame / 200;

    if (circle.currentTo >= circle.to) {
      to = circle.to;
    } else {
      to = circle.currentTo + circle.speed;
    }

    ctx.strokeStyle = circle.strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(
      this.state.size / 2,
      this.state.size / 2,
      radius,
      circle.offset + rotationOffset,
      circle.offset + to + rotationOffset,
    );
    ctx.stroke();
    circle.currentTo = to;
  }

  draw = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    this._clearScreen();

    this.circles.forEach(circle => {
      this._drawCircle(ctx, circle);
    });

    this._drawInnerCircle(ctx, this.innerCircle);

    this.texts.forEach(text => {
      this._drawTextAlongArc(
        text,
        ctx,
        this.state.size / 2,
        this.state.size / 2,
        Math.PI * 0.8,
      );
    });

    this.frame++;
  }

  _loop = () => {
    this.draw();
    setTimeout(this._loop, 16);
  }

  _clearScreen = () => {
    let canvas = this.canvasRef.current;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(
      0,
      0,
      this.state.size,
      this.state.size,
    );
  };

  render() {
    return (
      <Wrapper>
        <Canvas
          ref={this.canvasRef}
          width={this.state.size}
          height={this.state.size}
        ></Canvas>
      </Wrapper>
    );
  }

};

export default Who;
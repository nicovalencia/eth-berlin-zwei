import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const RED = "#ff1814";
const BLUE = "#1700ff";
const GRAY = "#373737";
const PARCHMENT = "#fdf7e2";
const MAX_FRAME_RATE = 60;
const SPEED_MULTIPLIER = 4;

const MAX_WIDTH = 800;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
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
      speed: Math.PI / 100 * SPEED_MULTIPLIER,
      strokeStyle: RED,
      lineWidth: 60,
    }, {
      delay: 20,
      radius: 0.3,
      offset: 0.1 * Math.PI * 2,
      to: 0.33 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 160 * SPEED_MULTIPLIER,
      strokeStyle: RED,
      lineWidth: 20,
    }, {
      delay: 40,
      radius: 0.3,
      offset: 1.5 * Math.PI * 2,
      to: 0.33 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 120 * SPEED_MULTIPLIER,
      strokeStyle: BLUE,
      lineWidth: 80,
    }, {
      delay: 60,
      radius: 0.4,
      offset: 0.3 * Math.PI * 2,
      to: 0.4 * Math.PI * 2,
      currentTo: 0,
      speed: Math.PI / 200 * SPEED_MULTIPLIER,
      strokeStyle: GRAY,
      lineWidth: 10,
    }];

    this.texts = [{
      string: '626 HACKERS',
      fontSize: 22,
      fillStyle: '#fdf7e2',
      radius: 0.185,
      offset: 0.67 * Math.PI * 2,
      angle: 0.4 * Math.PI * 2,
    }, {
      string: '38 SPONSORS',
      fontSize: 18,
      fillStyle: PARCHMENT,
      radius: 0.285,
      offset: -0.11 * Math.PI * 2,
      angle: 0.25 * Math.PI * 2,
    }, {
      string: '21 MENTORS',
      fontSize: 14,
      fillStyle: RED,
      radius: 0.33,
      offset: 0.43 * Math.PI * 2,
      angle: 0.15 * Math.PI * 2,
    }, {
      string: '61 VOLUNTEERS',
      fontSize: 14,
      fillStyle: GRAY,
      radius: 0.43,
      offset: 0.63 * Math.PI * 2,
      angle: 0.15 * Math.PI * 2,
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

  _drawCenterText = (ctx) => {

    let verticalOffset = this.state.size * 0.02;

    // Number:
    ctx.font = `${50 * this.state.size / 500}px Baumans`;
    ctx.fillStyle = PARCHMENT;
    ctx.fillText(
      '1218',
      this.state.size / 2,
      this.state.size / 2 + verticalOffset,
    );

    // Attendees:
    ctx.font = `${15 * this.state.size / 500}px Baumans`;
    ctx.fillStyle = PARCHMENT;
    ctx.fillText(
      'ATTENDEES',
      this.state.size / 2,
      this.state.size / 2 + this.state.size * 0.04 + verticalOffset,
    );
  }

  _drawTextAlongArc = (text, ctx, centerX, centerY) => {
    let s;
    let radius = text.radius * this.state.size;
    let rotationOffset = (this.frame / 200) + text.offset;

    ctx.font = `${text.fontSize * this.state.size / 500}px Baumans`;
    ctx.textAlign = 'center';
    ctx.fillStyle = text.fillStyle;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationOffset + -1 * text.angle / 2);
    ctx.rotate(-1 * (text.angle / text.string.length) / 2);
    for(var n = 0; n < text.string.length; n++) {
      ctx.rotate(text.angle / text.string.length);
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
      );
    });

    this._drawCenterText(ctx);

    this.frame++;
  }

  _loop = () => {
    this.draw();
    setTimeout(() => {
      window.requestAnimationFrame(this._loop);
    }, 1000 / MAX_FRAME_RATE);
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
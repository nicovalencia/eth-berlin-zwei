import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const RED = "#ff1814";
const BLUE = "#1700ff";
const YELLOW = "#ffce00";
const GRAY = "#373737";
const MAX_FRAME_RATE = 60;

const MAX_WIDTH = 800;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
`;

const Canvas = styled.canvas`
`;

class How extends React.Component {

  state = {
    size: 0,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.frame = 0;

    this.circles = [{
      fillStyle: RED,
      radius: 0.2,
      frameLength: 60,
      delay: 0,
      x: 0.5,
      y: 0.6,
    }, {
      fillStyle: BLUE,
      radius: 0.1,
      frameLength: 60,
      delay: 5,
      x: 0.35,
      y: 0.45,
    }, {
      fillStyle: YELLOW,
      radius: 0.07,
      frameLength: 60,
      delay: 10,
      x: 0.7,
      y: 0.3,
    }];

    this.arcs = [{
      strokeStyle: BLUE,
      lineWidth: 20,
      radius: 0.025,
      frameLength: 60,
      delay: 15,
      x: 0.7,
      y: 0.6,
    }, {
      strokeStyle: RED,
      lineWidth: 20,
      radius: 0.05,
      frameLength: 60,
      delay: 20,
      x: 0.4,
      y: 0.2,
    }, {
      strokeStyle: YELLOW,
      lineWidth: 20,
      radius: 0.05,
      frameLength: 60,
      delay: 25,
      x: 0.2,
      y: 0.6,
    }, {
      strokeStyle: GRAY,
      lineWidth: 10,
      radius: 0.4,
      frameLength: 60,
      delay: 30,
      x: 0.5,
      y: 0.5,
    }];

    this.labels = [{
      string: "Ethereum",
      fontSize: 22,
      fillStyle: GRAY,
      x: 0.25,
      y: 0.05,
      delay: 95,
    }, {
      string: "Waves",
      fontSize: 22,
      fillStyle: GRAY,
      x: 0.25,
      y: -0.16,
      delay: 95,
    }, {
      string: "Chain Link",
      fontSize: 22,
      fillStyle: GRAY,
      x: 0.6,
      y: 0,
      delay: 95,
    }];
  }

  componentDidMount() {
    let size = Math.min(window.innerWidth, MAX_WIDTH);
    this.setState({ size })
    setTimeout(this._loop, 1);
  }

  draw = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = "multiply";

    this._clearScreen();

    this.circles.forEach(circle => {
      this._drawCircle(ctx, circle);
    });

    this.arcs.forEach(arc => {
      this._drawArc(ctx, arc);
    });

    this.labels.forEach(label => {
      this._drawLabel(ctx, label);
    });

    this.frame++;
  }

  _drawCircle = (ctx, circle) => {
    let radius = circle.radius * this.state.size;

    if (this.frame < circle.delay) return;

    if (
      this.frame >= circle.delay &&
      this.frame < (circle.frameLength + circle.delay)
    ) {
      let percentage = (this.frame - circle.delay) / circle.frameLength;
      radius = radius * percentage;
    }

    ctx.fillStyle = circle.fillStyle;
    ctx.beginPath();
    ctx.arc(
      circle.x * this.state.size,
      circle.y * this.state.size,
      radius,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  _drawArc = (ctx, arc) => {
    let radius = arc.radius * this.state.size;

    if (this.frame < arc.delay) return;

    if (
      this.frame >= arc.delay &&
      this.frame < (arc.frameLength + arc.delay)
    ) {
      let percentage = (this.frame - arc.delay) / arc.frameLength;
      radius = radius * percentage;
    }

    ctx.strokeStyle = arc.strokeStyle;
    ctx.lineWidth = arc.lineWidth * this.state.size / 1000;
    ctx.beginPath();
    ctx.arc(
      arc.x * this.state.size,
      arc.y * this.state.size,
      radius,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
  }

  _drawLabel = (ctx, label) => {
    if (this.frame < label.delay) return;

    // Text
    ctx.font = `${label.fontSize * this.state.size / 500}px Baumans`;
    ctx.direction = 'rtl';
    ctx.fillStyle = label.fillStyle;
    ctx.lineWidth = this.state.size / 200;
    ctx.save();
    ctx.translate(this.state.size / 2, this.state.size / 2);
    ctx.rotate(- Math.PI / 4);
    ctx.fillText(
      label.string,
      label.x * this.state.size,
      label.y * this.state.size,
    );
    ctx.beginPath();
    ctx.moveTo(
      label.x * this.state.size,
      (label.y + 0.02) * this.state.size,
    );
    ctx.lineTo(
      (label.x - 0.3) * this.state.size,
      (label.y + 0.02) * this.state.size,
    );
    ctx.stroke();
    ctx.restore();
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

export default How;
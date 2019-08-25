import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const RED = "#ff1814";
const BLUE = "#1700ff";
const GRAY = "#373737";
const PARCHMENT = "#fdf7e2";
const MAX_FRAME_RATE = 16;

const MAX_WIDTH = 800;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
`;

const Canvas = styled.canvas`
`;

class What extends React.Component {

  state = {
    size: 0,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.frame = 0;

    this.texts = [{
      string: '7560',
      fontSize: 100,
      fillStyle: RED,
      angle: - Math.PI / 4,
      xOffset: -0.2,
      yOffset: -0.08,
    }, {
      string: '#BUIDLHOURS',
      fontSize: 40,
      fillStyle: GRAY,
      angle: - Math.PI / 4,
      xOffset: -0.005,
      yOffset: 0,
    }, {
      string: 'PR  JECTS',
      fontSize: 80,
      fillStyle: GRAY,
      angle: Math.PI / 4,
      xOffset: 0.075,
      yOffset: -0.02,
    }, {
      string: '73',
      fontSize: 80,
      fillStyle: BLUE,
      angle: Math.PI / 4,
      xOffset: -0.15,
      yOffset: -0.15,
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

    this._clearScreen();

    this.texts.forEach(text => {
      this._drawText(ctx, text);
    });

    this.frame++;
  }

  _drawText = (ctx, text) => {
    ctx.font = `${text.fontSize * this.state.size / 500}px Baumans`;
    ctx.textAlign = 'center';
    ctx.fillStyle = text.fillStyle;

    ctx.save();
    ctx.translate(this.state.size / 2, this.state.size / 2);
    ctx.rotate(text.angle);
    ctx.fillText(text.string, text.xOffset * this.state.size, text.yOffset * this.state.size);
    ctx.restore();
  }

  _loop = () => {
    this.draw();
    setTimeout(this._loop, MAX_FRAME_RATE);
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

export default What;
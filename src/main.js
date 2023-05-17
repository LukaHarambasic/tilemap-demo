import { Game, CANVAS } from 'phaser'
import './style.css'
import { Overworld } from './scenes/Overworld'

const canvasElement = document.getElementById('game')

export const CONFIG = {
  type: CANVAS,
  render: {
    pixelArt: true,
  },
  width: 320,
  height: 240,
  canvas: canvasElement,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  zoom: 2,
  scene: [Overworld],
}

new Game(CONFIG)

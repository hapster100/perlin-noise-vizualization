
const c = document.getElementById('noise')
const cc = c.getContext('2d')
const rgbStyle = (r, g, b, a = 1) => `rgba(${r},${g},${b},${a})`

c.height = 500
c.width = document.body.clientWidth / document.body.clientHeight * c.height

const settings = {
  dt: 0.02,
  aProc: 0.02,
  dy: 20,
  dx: 1,
  amplitude: 30,
  offy: -0.5,
  yScale: 5,
  xScale: 5,
  ySpeed: 5,
  xSpeed: 5
}

let noise = new SimplexNoise()

let t = 0
let xPos = 0
let yPos = 0
let time = Date.now()

const drawNoise = (offsety = 0) => {
  cc.fillStyle = rgbStyle(0,0,0, settings.aProc)
  cc.fillRect(0, 0, c.width, c.height)
  for(
    let j = offsety%settings.dy - settings.amplitude - settings.dy; 
    j < c.height + settings.amplitude ; 
    j += settings.dy
  ) {

    let colorPhase = (Math.sin(yPos + j / c.height * Math.PI / 2) + 1) / 2

    cc.strokeStyle = rgbStyle(
      colorPhase * 255, 
      Math.abs (colorPhase * 255 - 125),
      255 -  colorPhase * 255
    )
    
    cc.beginPath()
    for(let i = 0 ; i < c.width + settings.dx; i+=settings.dx) {
      let h = noise.noise(xPos + i / c.width * settings.xScale, yPos + j / c.height * settings.yScale)
      
      cc.lineTo(i, h * settings.amplitude + j)  
    }
    cc.stroke()
  }

  let dt = (Date.now() - time) / 1000 * settings.dt 
  t += (Date.now() - time) / 1000 * settings.dt

  xPos += dt * settings.xSpeed
  yPos += dt * settings.ySpeed 
  
  time = Date.now()


  setTimeout(() =>drawNoise(offsety + settings.offy), 0)
}

const settingsNode = document.getElementById('settings')

const dtSlider = new Slider(0, 0.1, 'T step', settings.dt, v => settings.dt = v)
const dySlider = new Slider(2, 400, 'Y step', settings.dy, v => settings.dy = v)
const dxSlider = new Slider(1, 10, 'X step', settings.dx, v => settings.dx = v)
const ysSlider = new Slider(1, 70, 'Y scale', settings.yScale, v => settings.yScale = v)
const xsSlider = new Slider(1, 70, 'X scale', settings.xScale, v => settings.xScale = v)
const yspSlider = new Slider(1, 70, 'Y speed', settings.ySpeed, v => settings.ySpeed = v)
const xspSlider = new Slider(1, 70, 'X speed', settings.xSpeed, v => settings.xSpeed = v)
const aSlider = new Slider(0, 0.1, 'Alpha', settings.aProc, v => settings.aProc = v)
const scanSlider = new Slider(-1, 1, 'Y Speed', settings.offy, v => settings.offy = v)
const amplSlider = new Slider(1, 100, 'Amplitude', settings.amplitude, v => settings.amplitude = v)
const lwSlider = new Slider(1, 10, 'Line Width', 1, v => cc.lineWidth = v)

settingsNode.appendChild(dtSlider.node)
settingsNode.appendChild(dySlider.node)
settingsNode.appendChild(dxSlider.node)
settingsNode.appendChild(ysSlider.node)
settingsNode.appendChild(xsSlider.node)
settingsNode.appendChild(yspSlider.node)
settingsNode.appendChild(xspSlider.node)
settingsNode.appendChild(aSlider.node)
settingsNode.appendChild(scanSlider.node)
settingsNode.appendChild(amplSlider.node)
settingsNode.appendChild(lwSlider.node)

cc.fillRect(0, 0, c.width, c.height)
setTimeout(drawNoise, 0)

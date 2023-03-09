
const c = document.getElementById('noise')
const cc = c.getContext('2d')
const rgbStyle = (r, g, b, a = 1) => `rgba(${r},${g},${b},${a})`

c.height = 500
c.width = document.body.clientWidth / document.body.clientHeight * c.height

const settings = {
  dt: 1,
  aProc: 0.01,
  dy: 10,
  amplitude: 10,
  offy: -0.1,
  yScale: 5,
  xScale: 2,
  ySpeed: 0.2,
  xSpeed: 0.1
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
    for(let i = 0 ; i < c.width; i++) {
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

const dtSlider = new Slider(0, 1, 'dT', settings.dt, v => settings.dt = v)
const xspSlider = new Slider(-1, 1, 'dX', settings.xSpeed, v => settings.xSpeed = v)
const yspSlider = new Slider(-1, 1, 'dY', settings.ySpeed, v => settings.ySpeed = v)
const dySlider = new Slider(2, 50, 'Gap', settings.dy, v => settings.dy = v)
const amplSlider = new Slider(1, 10, 'Amp', settings.amplitude, v => settings.amplitude = v)

const xsSlider = new Slider(1, 20, 'X Rng', settings.xScale, v => settings.xScale = v)
const ysSlider = new Slider(1, 20, 'Y Rng', settings.yScale, v => settings.yScale = v)

const scanSlider = new Slider(-0.1, 0.1, 'Scan', settings.offy, v => settings.offy = v)
const aSlider = new Slider(0, 0.1, 'Alpha', settings.aProc, v => settings.aProc = v)
const lwSlider = new Slider(1, 10, 'Width', 1, v => cc.lineWidth = v)

const openSettingButton = document.createElement('button')
openSettingButton.classList.add('settings__open-btn')

const settingsIcon = document.createElement('img')
settingsIcon.src = 'settings.svg'
settingsIcon.classList.add('settings__icon')

openSettingButton.appendChild(settingsIcon)

openSettingButton.onclick = () => {
  if (settingsNode.classList.contains('settings--show')) {
    settingsNode.classList.remove('settings--show')
  } else {
    settingsNode.classList.add('settings--show')
  }
}

settingsNode.appendChild(dtSlider.node)
settingsNode.appendChild(xspSlider.node)
settingsNode.appendChild(yspSlider.node)
settingsNode.appendChild(dySlider.node)

settingsNode.appendChild(openSettingButton)
settingsNode.appendChild(ysSlider.node)
settingsNode.appendChild(xsSlider.node)
settingsNode.appendChild(aSlider.node)
settingsNode.appendChild(scanSlider.node)
settingsNode.appendChild(amplSlider.node)
settingsNode.appendChild(lwSlider.node)

cc.fillRect(0, 0, c.width, c.height)
setTimeout(drawNoise, 0)

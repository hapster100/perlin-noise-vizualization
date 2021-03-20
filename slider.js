class Slider {
  constructor(min, max, label, value, onChange) {
    this.min = min
    this.max = max
    this.label = label
    this.value = value
    this.onChange = onChange
    this.node = this._create()
  }

  _create() {
    this.node = document.createElement('div')
    this.node.classList.add('slider')
    this._render()

    this.node.addEventListener('change', e => {
      this.value = Number(e.target.value)
      this._render()
      this.onChange(this.value)
    })
    
    return this.node
  }
  
  _render() {
    this.node.innerHTML = `
      <label for="${this.label}">
        ${this.label}
      </label>
      <input 
        id="${this.label}" 
        type="range" 
        max="${this.max}" 
        step="${(this.max - this.min) / 1000}" 
        min="${this.min}"
        value="${this.value}"
      />
    `
  }
}
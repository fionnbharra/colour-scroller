module.exports = class BgColourSetter {
  constructor() {
    window.addEventListener('activeDivs', (ev) => this.animateDivs(ev.detail));
  }

  getRGB(startElem, endElem, percentageThrough) {
    return {
      red: this.getNewRange(startElem, endElem, percentageThrough, 'red'),
      green: this.getNewRange(startElem, endElem, percentageThrough, 'green'),
      blue: this.getNewRange(startElem, endElem, percentageThrough, 'blue')
    };
  }

  getNewRange(startElem, endElem, percentageThrough, key) {
    let newMin = Number(startElem.dataset[key]),
        newMax = Number(endElem.dataset[key]),
        oldValue = percentageThrough;

    const newRange = (newMax - newMin);
    let newValue = Math.round(((oldValue * newRange) / 100) + newMin);

    return newValue;
  }

  animateDivs(details){
    if(!details.active) { return; }
    const colour = this.getRGB(details.startDiv, details.endDiv, details.percentageThrough);
    document.body.style.backgroundColor = `rgb(${colour.red}, ${colour.green}, ${colour.blue})`;
  }

};

/**
 * Takes two divs and publishes an event on scroll.
 * The event is an object containg both divs, an active indicator and the percentage scorlled between both divs
 * @constructor
 * @param {element} startDiv - first div
 * @param {element} endDiv - second div
 */
module.exports = class ScrollBetweenBroadcaster {
  constructor(startDiv, endDiv) {
    this.startDiv = startDiv;
    this.endDiv = endDiv;
    const distance = this.endDiv.offsetTop - this.startDiv.offsetTop;
    const startOffset = this.startDiv.offsetTop;
    window.addEventListener('scroll',
      (ev) => this.scrollHandler(ev, startOffset, distance)
    );
  }

  broadCast(percentageThrough) {
    let active = false;
    if (percentageThrough > 0 && percentageThrough < 100) { active = true; }

    var event = new CustomEvent('activeDivs', {
       'detail': {
         percentageThrough,
         active,
         'startDiv': this.startDiv,
         'endDiv': this.endDiv
       }
     });
    window.dispatchEvent(event);
  }

  scrollHandler(ev, startOffset, distance) {
    const scrollPos = ev.currentTarget.scrollY;
    const percentageThrough = this.calcPercentageThrough(scrollPos, startOffset, distance);
    this.broadCast(percentageThrough);
  }

  calcPercentageThrough(scrollPos, offset, distance) {
    const amountThrough = (( (scrollPos - offset) / distance).toFixed(2) ) * 100;
    if (amountThrough <= 0) { return 0; }
    if (amountThrough >= 100) { return 100; }
    return amountThrough;
  }

};

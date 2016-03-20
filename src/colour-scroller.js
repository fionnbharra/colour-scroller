import ScrollBetweenBroadcaster from './scroll-between-broadcaster';
import BgColourSetter from './bg-colour-setter';

module.exports = class ColourScroller { 
  constructor(elems /* nodelist */) {
    for (var i = 0; i < elems.length; i++) {
      if (elems[i + 1] === undefined) { break; }
      // publishes an event to indicate which div.row we have scrolled to
      new ScrollBetweenBroadcaster(elems[i], elems[i + 1]);
    }
    // listens for that event and updates body bg colour
    new BgColourSetter();
  }
};

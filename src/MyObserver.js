class MyObserver {
  constructor() {
    this.elmsToObserve = [];

    this._observe = this._observe.bind(this);
    this._observe();
  }

  addItem(el, cb, threshold) {
    if (!el) throw new Error('target element is undefined!');
    if (!cb) throw new Error('callback is undefined!');
    threshold = threshold || 1;

    this.elmsToObserve.push({ el, cb, threshold });
  }

  _observe() {
    const elmsArr = this.elmsToObserve;

    for (let i = 0; i < elmsArr.length; i++) {
      let len = elmsArr[i].el.length;
      let isInVp;

      if (len) {
        // target is a nodelist
        for (let j = 0; j < len; j++) {
          isInVp = this._isElementInViewport({
            target: elmsArr[i].el[j],
            threshold: elmsArr[i].threshold
          });

          if (isInVp) elmsArr[i].cb(elmsArr[i].el[j]);
        }
      } else {
        // target is a single node
        isInVp = this._isElementInViewport({
          target: elmsArr[i].target,
          threshold: elmsArr[i].threshold
        });

        if (isInVp) elmsArr[i].cb(elmsArr[i].el);
      }
    }

    requestAnimationFrame(this._observe);
  }

  _isElementInViewport({ target, threshold }) {
    const rect = target.getBoundingClientRect();

    return (
      window.innerHeight - rect.top >=
        (rect.height * (threshold * 100)) / 100 && rect.bottom > 0
    );

    // return innerHeight - rect.top >= (rect.height * (threshold * 100)) / 100;
  }
}

export default MyObserver;

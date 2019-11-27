/**
 * Hjálparfall sem tæmir tiltekið element (eyðir börnum þess).
 * @param {*} element elementið sem skal hreinsa
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Hjálparfall sem býr til nýtt element.
 * @param {*} name Html týpan sem element skal vera.
 * @param {*} cssclass Css klasi sem element skal hafa.
 * @param  {...any} children Börn sem element skal innihalda.
 */
export function el(name, cssclass, ...children) {
  const element = document.createElement(name);
  if (cssclass) element.classList.add(cssclass);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

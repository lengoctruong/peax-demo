export const concatClassName = (
  className: string,
  prop: string | number = '',
  optionalSign: string = ''
) => {
  return prop
    ? className.concat(optionalSign) + prop
    : className.concat(optionalSign);
};

export const getElementWithId = (id: string) => {
  return document.getElementById(id);
};

export const getElementWithClass = (className: string) => {
  return document.getElementsByClassName(className);
};

export const queryAll = (className: string, optionalSign: string = '') => {
  return document.querySelectorAll(optionalSign.concat(className));
};

export const query = (className: string, optionalSign: string = '') => {
  return document.querySelector(optionalSign.concat(className));
};

export const addClass = (
  element: HTMLElement | Element,
  className: string = ''
) => {
  if (!element) {
    return;
  }
  element.classList.add(className);
};

export const removeClass = (
  element: HTMLElement | Element,
  className: string = ''
) => {
  if (!element) {
    return;
  }
  element.classList.remove(className);
};

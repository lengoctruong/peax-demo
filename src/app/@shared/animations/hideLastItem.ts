export const hideLastItem = (selector: string, cssClass1: string) => {
  const elements = document.getElementsByClassName(selector);
  elements[elements.length - 1].classList.add(cssClass1);
};

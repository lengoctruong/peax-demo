export const scrollLeft = (
  selector: string,
  cssClass1: string,
  cssClass2: string
) => {
  const elements = document.getElementsByClassName(selector);

  elements[elements.length - 1].classList.remove(cssClass1);

  elements[0].classList.add(cssClass1);
  setTimeout(() => {
    elements[0].classList.add(cssClass2);
  }, 300);
};

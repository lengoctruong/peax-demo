export const slideLeftLastItem = (
  selector: string,
  cssClass1: string,
  cssClass2: string
) => {
  const elements = document.getElementsByClassName(selector);
  const eleLength = elements.length;

  elements[eleLength - 1].classList.add(cssClass1);

  setTimeout(() => {
    elements[eleLength - 1].classList.add(cssClass2);
  }, 300);
};

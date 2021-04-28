import * as AnimationHelper from '@shared/animations/animation-helper';

export const slideLeftLastItem = (
  selector: string,
  class1: string,
  class2: string
) => {
  const elements = AnimationHelper.getElementWithClass(selector);
  const eleLength = elements.length;

  AnimationHelper.addClass(elements[eleLength - 1], class1);

  setTimeout(() => {
    AnimationHelper.addClass(elements[eleLength - 1], class2);
  }, 300);
};

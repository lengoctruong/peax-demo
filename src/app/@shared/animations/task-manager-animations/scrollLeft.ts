import * as AnimationHelper from '@shared/animations/animation-helper';

export const scrollLeft = (
  selector: string,
  class1: string,
  class2: string
) => {
  const elements = AnimationHelper.getElementWithClass(selector);

  AnimationHelper.removeClass(elements[elements.length - 1], class1);

  AnimationHelper.addClass(elements[0], class1);

  setTimeout(() => {
    AnimationHelper.addClass(elements[0], class2);
  }, 300);
};

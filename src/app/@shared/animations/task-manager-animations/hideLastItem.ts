import * as AnimationHelper from '@shared/animations/animation-helper';

export const hideLastItem = (selector: string, class1: string) => {
  const elements = AnimationHelper.getElementWithClass(selector);

  AnimationHelper.addClass(elements[elements.length - 1], class1);
};

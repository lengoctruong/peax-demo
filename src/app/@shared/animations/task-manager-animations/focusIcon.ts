import * as AnimationHelper from '@shared/animations/animation-helper';

export const focusIcon = (id: number, class1: string, class2: string) => {
  const iconId = AnimationHelper.concatClassName(class1, id, '-');
  const element = AnimationHelper.getElementWithId(iconId);

  // Remove focus
  const bgIcon = AnimationHelper.queryAll(class1, '.');
  if (bgIcon.length > 0) {
    bgIcon.forEach((ele) => AnimationHelper.removeClass(ele, class2));
  }

  // Add focus to active category
  if (element) {
    AnimationHelper.addClass(element, class2);
  }
};

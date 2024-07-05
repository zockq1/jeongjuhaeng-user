import { KeywordModel } from '@/types/topicTypes';

export default function removeDuplicateDateComments(
  keyword: KeywordModel,
  index: number,
  arr: KeywordModel[],
) {
  return arr[index - 1] && arr[index - 1].dateComment === keyword.dateComment
    ? ''
    : keyword.dateComment;
}

import { ReactNode } from 'react';

import { ContentState } from './jjhTypes';

export type Color = 'red' | 'blue' | 'black' | 'green';

export interface MenuModel {
  type: 'Base' | 'Qustion' | 'Progress';
  title: ReactNode;
  icon?: ReactNode;
  state?: ContentState;
  subTitle?: ReactNode;
  description?: ReactNode;
  score?: number;
  onClickMain?: () => void;
  onClickSub?: () => void;
  onClickReplace?: () => void;
  mainColor?: string;
  titleColor?: string;
  content?: ReactNode;
  important?: boolean;
  topicTitle?: string;
  isBookmarked?: boolean;
  id?: number | string;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}

export interface SearchModel {
  chapterList: {
    chapterNumber: number;
    chapterTitle: string;
  }[];
  topicList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
  }[];
  keywordList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
    keywordName: string;
    keywordComment: string;
  }[];
}

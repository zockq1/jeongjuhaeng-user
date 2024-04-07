export interface TimeLineItemModel {
  comment: string;
  date: number;
  keywordList: string[] | null;
  dateComment: string;
}

export interface TimelineListModel {
  title: string;
  era: string;
  startDate: number;
  endDate: number;
  id: number;
  score: number;
  timelineCount: number;
}

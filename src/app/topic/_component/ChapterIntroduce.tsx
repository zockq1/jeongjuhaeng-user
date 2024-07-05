import Chapter from '@/assets/images/books.svg';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';

export default function ChapterIntroduce() {
  return (
    <ContentBox title="단원 학습" subTitle="선사시대 ~ 현대">
      <Timeline>
        <Timeline.Item
          dateItem={{
            date: '',
            title: '',
            comment: [],
            file: Chapter,
          }}
          disableComment
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '단원별로 주제가 정리되어 있습니다.',
            comment: [],
          }}
          disableComment
        />
      </Timeline>
    </ContentBox>
  );
}

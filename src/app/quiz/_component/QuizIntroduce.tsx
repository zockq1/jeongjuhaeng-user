import Quiz from '@/assets/images/quiz.svg';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';

export default function QuizIntroduce() {
  return (
    <ContentBox title="문제 분류별 학습" subTitle="선사시대 ~ 문화유산">
      <Timeline>
        <Timeline.Item
          dateItem={{
            date: '',
            title: '',
            comment: [],
            file: Quiz,
          }}
          disableComment
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '같은 문제 분류별로 주제가 정리되어 있습니다.',
            comment: [],
          }}
          disableComment
        />
      </Timeline>
    </ContentBox>
  );
}

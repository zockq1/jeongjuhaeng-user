import Time from '@/assets/images/timeline.svg';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';

export default function TimelineIntroduce() {
  return (
    <ContentBox title="연표 학습" subTitle="BC700000 ~ 2024">
      <Timeline>
        <Timeline.Item
          dateItem={{
            date: '',
            title: '',
            comment: [],
            file: Time,
          }}
          disableComment
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '시대별로 연표가 정리되어 있습니다.',
            comment: [],
          }}
          disableComment
        />
      </Timeline>
    </ContentBox>
  );
}

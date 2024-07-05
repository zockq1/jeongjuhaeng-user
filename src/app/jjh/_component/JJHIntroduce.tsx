import Run from '@/assets/images/run.svg';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';

export default function JJHIntroduce() {
  return (
    <ContentBox title="정주행 학습" subTitle="선사시대 ~ 현대">
      <Timeline>
        <Timeline.Item
          dateItem={{
            date: '',
            title: '',
            comment: [],
            file: Run,
          }}
          disableComment
        />
        <Timeline.Item
          dateItem={{
            date: '단원별 학습',
            title: '주제 별 키워드 외워주세요',
            comment: ['클릭으로 설명과, 키워드를 접을 수 있어요!'],
          }}
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '주제별 문제를 풀어주세요',
            comment: [
              '80% 이상 맞추면 다음 주제로 넘어갈 수 있습니다.',
              '주제를 보고 키워드를 맞춥니다.',
              '키워드의 개수 만큼 문제가 나옵니다.',
              '만약 키워드가 5개보다 적다면 이전에 풀었던 주제로 나머지 문제가 채워집니다.',
            ],
          }}
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '단원 마무리 문제를 풀어주세요',
            comment: [
              '80% 이상 맞추면 다음 주제로 넘어갈 수 있습니다.',
              '키워드를 보고 주제를 맞춥니다.',
              '단원 마무리 문제까지 맞추면 다음 단원으로 넘어갑니다',
            ],
          }}
        />
        <Timeline.Item
          dateItem={{
            date: '연표 학습',
            title: '연표의 순서를 외워주세요',
            comment: [],
          }}
          disableComment
        />
        <Timeline.Item
          dateItem={{
            date: '',
            title: '순서 맞추기 문제를 풀어주세요',
            comment: ['4번 이하로 맞추시면 다음 단원으로 넘어갑니다'],
          }}
        />
      </Timeline>
    </ContentBox>
  );
}

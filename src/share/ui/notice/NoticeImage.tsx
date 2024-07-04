import styled from 'styled-components';

import Books from '@/assets/images/books.svg';
import Timeline from '@/assets/images/date.svg';
import Quiz from '@/assets/images/quiz.svg';
import Run from '@/assets/images/run.svg';

interface NoticeImageProps {
  image: 'jjh' | 'timeline' | 'chapter' | 'quiz';
}

export default function NoticeImage({ image }: NoticeImageProps) {
  const noticeImages = {
    jjh: Run,
    timeline: Timeline,
    chapter: Books,
    quiz: Quiz,
  };
  return (
    <NoticeImageContainer>
      <Img src={noticeImages[image]} />
    </NoticeImageContainer>
  );
}

const NoticeImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
`;

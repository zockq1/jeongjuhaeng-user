import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Books from '@/assets/images/books.svg';
import Timeline from '@/assets/images/date.svg';
import Quiz from '@/assets/images/quiz.svg';
import Run from '@/assets/images/run.svg';
import Search from '@/assets/images/search.svg';
import Carousel, { MenuModel } from '@/share/ui/carousel/Carousel';
import { RootState } from '@/store/store';

export default function CardList() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const cardList = useRef<MenuModel[]>([
    {
      id: '0',
      imgSrc: Search,
      title: '설정',
      description: ' ',
      button: '설정 바로가기',
      to: () => navigate('/option'),
    },
    {
      id: '1',
      imgSrc: Books,
      title: '단원 학습',
      description: '단원별로 정리된 한국사 정보',
      button: '자료 보러가기',
      to: () => navigate('/learning'),
    },
    {
      id: '2',
      imgSrc: Run,
      title: '정주행',
      description: '순서대로 한능검 시험 공부',
      button: '정주행 하러가기',
      to: () => navigate('/jeong-ju-haeng'),
    },
    {
      id: '3',
      imgSrc: Timeline,
      title: '연표 학습',
      description: '연도별로 정리된 한국사 정보',
      button: '연표 보러가기',
      to: () => navigate('/timeline-list'),
    },
    {
      id: '4',
      imgSrc: Quiz,
      title: '문제 분류',
      description: '문제 분류별 한국사 정보',
      button: '문제 분류 보러가기',
      to: () =>
        isLoggedIn ? navigate('/quiz') : alert('로그인 후 이용 가능합니다.'),
    },
  ]);

  return <Carousel cardList={cardList.current} />;
}

import { useRef } from 'react';

import Books from '@/assets/images/books.svg';
import Timeline from '@/assets/images/date.svg';
import Quiz from '@/assets/images/quiz.svg';
import Run from '@/assets/images/run.svg';
import Search from '@/assets/images/search.svg';
import Carousel, { MenuModel } from '@/share/ui/carousel/Carousel';

export default function CardList() {
  const cardList = useRef<MenuModel[]>([
    {
      id: '0',
      imgSrc: Search,
      title: '설정',
      description: ' ',
      button: '설정 바로가기',
      to: '/option',
    },
    {
      id: '1',
      imgSrc: Books,
      title: '단원 학습',
      description: '단원별로 정리된 한국사 정보',
      button: '자료 보러가기',
      to: '/chapter',
    },
    {
      id: '2',
      imgSrc: Run,
      title: '정주행',
      description: '순서대로 한능검 시험 공부',
      button: '정주행 하러가기',
      to: '/jeong-ju-haeng',
    },
    {
      id: '3',
      imgSrc: Timeline,
      title: '연표 학습',
      description: '연도별로 정리된 한국사 정보',
      button: '연표 보러가기',
      to: '/timeline-list',
    },
    {
      id: '4',
      imgSrc: Quiz,
      title: '문제 분류',
      description: '문제 분류별 한국사 정보',
      button: '문제 분류 보러가기',
      to: '/quiz',
    },
  ]);

  return <Carousel cardList={cardList.current} />;
}

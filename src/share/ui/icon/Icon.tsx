/// <reference types="vite-plugin-svgr/client" />

import AngleDown from './svg/angle-down.svg?react';
import AngleLeft from './svg/angle-left.svg?react';
import AngleRight from './svg/angle-right.svg?react';
import Fail from './svg/ban.svg?react';
import Culture from './svg/book-open-cover.svg?react';
import MyInfo from './svg/book-open-reader.svg?react';
import Timeline from './svg/calendar-clock.svg?react';
import Check from './svg/check.svg?react';
import CheckBox from './svg/checkbox.svg?react';
import User from './svg/circle-user.svg?react';
import Clock from './svg/clock-five.svg?react';
import Comment from './svg/comment.svg?react';
import Dice from './svg/dice-alt.svg?react';
import Dot from './svg/dot.svg?react';
import Down from './svg/down.svg?react';
import Exam from './svg/exam.svg?react';
import Hashtag from './svg/hastag.svg?react';
import Home from './svg/house-chimney.svg?react';
import Infinity from './svg/infinity.svg?react';
import Key from './svg/key.svg?react';
import Back from './svg/left.svg?react';
import Lock from './svg/lock.svg?react';
import Menu from './svg/menu.svg?react';
import Pen from './svg/pen-clip.svg?react';
import Description from './svg/poll-h.svg?react';
import Question from './svg/question.svg?react';
import QuestionSquare from './svg/question-square.svg?react';
import Next from './svg/right.svg?react';
import Again from './svg/rotate-left.svg?react';
import Run from './svg/running.svg?react';
import Search from './svg/search.svg?react';
import Setting from './svg/settings.svg?react';
import Login from './svg/sign-in-alt.svg?react';
import O from './svg/square-o.svg?react';
import X from './svg/square-x.svg?react';
import Up from './svg/up.svg?react';

export type IconType =
  | ''
  | 'angleRight'
  | 'angleLeft'
  | 'angleDown'
  | 'run'
  | 'home'
  | 'questionSquare'
  | 'myInfo'
  | 'setting'
  | 'clock'
  | 'hashtag'
  | 'description'
  | 'pen'
  | 'question'
  | 'infinity'
  | 'dice'
  | 'login'
  | 'user'
  | 'lock'
  | 'back'
  | 'check'
  | 'checkBox'
  | 'fail'
  | 'back'
  | 'next'
  | 'again'
  | 'o'
  | 'x'
  | 'key'
  | 'comment'
  | 'search'
  | 'culture'
  | 'dot'
  | 'up'
  | 'down'
  | 'exam'
  | 'timeline'
  | 'menu';

interface Iconprops {
  icon: IconType;
  color?: string;
  size?: number | string;
}

function Icon({ icon, size = 'inherit', color = 'inherit' }: Iconprops) {
  const icons: {
    [key: string]: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
  } = {
    //아이콘
    angleDown: AngleDown,
    angleRight: AngleRight,
    angleLeft: AngleLeft,
    run: Run,
    home: Home,
    questionSquare: QuestionSquare,
    myInfo: MyInfo,
    setting: Setting,
    clock: Clock,
    hashtag: Hashtag,
    description: Description,
    pen: Pen,
    question: Question,
    infinity: Infinity,
    again: Again,
    fail: Fail,
    dice: Dice,
    login: Login,
    user: User,
    lock: Lock,
    back: Back,
    next: Next,
    checkBox: CheckBox,
    check: Check,
    o: O,
    x: X,
    key: Key,
    comment: Comment,
    search: Search,
    culture: Culture,
    dot: Dot,
    up: Up,
    down: Down,
    exam: Exam,
    menu: Menu,
    timeline: Timeline,
  };

  if (!icons[icon]) return null;

  const SelectedIcon = icons[icon];
  return <SelectedIcon width={size} height={size} color={color} />;
}

export default Icon;

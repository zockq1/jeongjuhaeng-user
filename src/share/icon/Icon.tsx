/// <reference types="vite-plugin-svgr/client" />

import { Content } from '../../types/jjhTypes';
import { TopicCategory } from '../../types/topicTypes';
import Arrow from './svg/arrow.svg?react';
import Fail from './svg/ban.svg?react';
import Office from './svg/bank.svg?react';
import Topic from './svg/blog-text.svg?react';
import Culture from './svg/book-open-cover.svg?react';
import MyInfo from './svg/book-open-reader.svg?react';
import BookmarkOff from './svg/bookmark-off.svg?react';
import BookmarkOn from './svg/bookmark-on.svg?react';
import Timeline from './svg/calendar-clock.svg?react';
import Check from './svg/check.svg?react';
import CheckBox from './svg/checkbox.svg?react';
import User from './svg/circle-user.svg?react';
import Clock from './svg/clock-five.svg?react';
import Comment from './svg/comment.svg?react';
import Dice from './svg/dice-alt.svg?react';
import Dot from './svg/dot.svg?react';
import Down from './svg/down.svg?react';
import Drag from './svg/drag.svg?react';
import Exam from './svg/exam.svg?react';
import Exclamation from './svg/exclamation.svg?react';
import Flag from './svg/flag.svg?react';
import Hashtag from './svg/hastag.svg?react';
import Era from './svg/hourglass-end.svg?react';
import Home from './svg/house-chimney.svg?react';
import Identity from './svg/id-card-clip-alt.svg?react';
import Infinity from './svg/infinity.svg?react';
import Key from './svg/key.svg?react';
import Back from './svg/left.svg?react';
import Lock from './svg/lock.svg?react';
import Menu from './svg/menu.svg?react';
import Pen from './svg/pen-clip.svg?react';
import Policy from './svg/pen-field.svg?react';
import Description from './svg/poll-h.svg?react';
import Question from './svg/question.svg?react';
import QuestionSquare from './svg/question-square.svg?react';
import Chapter from './svg/rectangle-list.svg?react';
import Next from './svg/right.svg?react';
import Again from './svg/rotate-left.svg?react';
import Run from './svg/running.svg?react';
import Search from './svg/search.svg?react';
import Setting from './svg/settings.svg?react';
import Society from './svg/share.svg?react';
import Login from './svg/sign-in-alt.svg?react';
import One from './svg/square-1.svg?react';
import Two from './svg/square-2.svg?react';
import Three from './svg/square-3.svg?react';
import O from './svg/square-o.svg?react';
import X from './svg/square-x.svg?react';
import Up from './svg/up.svg?react';
import Person from './svg/user.svg?react';
import King from './svg/user-crown.svg?react';
import Organization from './svg/users-alt.svg?react';

export type IconType =
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
  | 'arrow'
  | 'check'
  | 'checkBox'
  | 'one'
  | 'two'
  | 'three'
  | 'fail'
  | 'back'
  | 'next'
  | 'again'
  | 'o'
  | 'x'
  | 'key'
  | 'comment'
  | 'bookmarkOn'
  | 'bookmarkOff'
  | 'search'
  | 'culture'
  | 'dot'
  | 'up'
  | 'down'
  | 'exam'
  | 'menu'
  | 'drag'
  | Content
  | TopicCategory;

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
    //콘텐트
    CHAPTER_INFO: Chapter,
    TIMELINE_STUDY: Timeline,
    TIMELINE_QUESTION: Timeline,
    TOPIC_STUDY: Topic,
    TOPIC_QUESTION: QuestionSquare,
    CHAPTER_COMPLETE_QUESTION: QuestionSquare,

    //주제
    인물: Person,
    국가: Flag,
    왕: King,
    시대: Era,
    사건: Exclamation,
    조직: Organization,
    기구: Office,
    문화: Culture,
    사회: Society,
    제도: Policy,
    신분: Identity,

    //아이콘
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
    arrow: Arrow,
    fail: Fail,
    dice: Dice,
    login: Login,
    user: User,
    lock: Lock,
    back: Back,
    next: Next,
    checkBox: CheckBox,
    check: Check,
    one: One,
    two: Two,
    three: Three,
    o: O,
    x: X,
    key: Key,
    comment: Comment,
    bookmarkOff: BookmarkOff,
    bookmarkOn: BookmarkOn,
    search: Search,
    culture: Culture,
    dot: Dot,
    up: Up,
    down: Down,
    exam: Exam,
    menu: Menu,
    drag: Drag,
  };

  if (!icons[icon]) return null;

  const SelectedIcon = icons[icon];
  return <SelectedIcon width={size} height={size} color={color} />;
}

export default Icon;

import { useSearchParams } from 'react-router-dom';

function useQuesryString() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const jjh = searchParams.get('jjh');
  const chapter = searchParams.get('chapter');
  const timeline = searchParams.get('timeline');
  const content = searchParams.get('content');
  const topic = searchParams.get('topic');
  const title = searchParams.get('title');
  const date = searchParams.get('date');
  const refresh = searchParams.get('refresh');
  return {
    code: String(code),
    jjh: Number(jjh),
    chapter: Number(chapter),
    timeline: Number(timeline),
    title: String(title),
    date: String(date),
    content: Number(content),
    topic: String(topic),
    refresh: Number(refresh),
  };
}

export default useQuesryString;

import { useSearchParams } from 'react-router-dom';

function useQuesryString() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const jjh = searchParams.get('jjh');
  const chapter = searchParams.get('chapter');
  const timeline = searchParams.get('timeline');
  const title = searchParams.get('title');
  const date = searchParams.get('date');
  return {
    code: String(code),
    jjh: Number(jjh),
    chapter: Number(chapter),
    timeline: Number(timeline),
    title: String(title),
    date: String(date),
  };
}

export default useQuesryString;

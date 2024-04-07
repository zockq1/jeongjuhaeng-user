import { useSearchParams } from 'react-router-dom';

function useQuesryString() {
  const [searchParams] = useSearchParams();
  const jjh = searchParams.get('code');
  const chapter = searchParams.get('chapter');
  const timeline = searchParams.get('timeline');
  return {
    code: String(jjh),
    chapter: Number(chapter),
    timeline: Number(timeline),
  };
}

export default useQuesryString;

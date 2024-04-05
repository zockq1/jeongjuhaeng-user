import { useSearchParams } from 'react-router-dom';

function useQuesryString() {
  const [searchParams] = useSearchParams();
  const jjh = searchParams.get('code');
  return {
    code: String(jjh),
  };
}

export default useQuesryString;

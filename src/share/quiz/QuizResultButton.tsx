import { useLocation, useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import ButtonGroup from '@/share/ui/button/ButtonGroup';
import Icon from '@/share/ui/icon/Icon';

interface ResultButtonUIProps {
  isSuccess: boolean;
  onNextContent: () => void;
}

export default function QuizResultButton({
  isSuccess,
  onNextContent,
}: ResultButtonUIProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useQuesryString();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('refresh', String(refresh + 1));
    const newSearch = searchParams.toString();

    navigate(`${location.pathname}?${newSearch}`, { replace: true });
  };

  return isSuccess ? (
    <ButtonGroup>
      <ButtonGroup.Item onClick={handleBack}>
        목록 &nbsp;
        <Icon icon="menu" size={22} />
      </ButtonGroup.Item>
      <ButtonGroup.Item onClick={handleRefresh}>
        다시 풀기 &nbsp;
        <Icon icon="again" size={22} />
      </ButtonGroup.Item>
      <ButtonGroup.Item onClick={onNextContent}>
        다음 문제&nbsp;
        <Icon icon="next" size={22} />
      </ButtonGroup.Item>
    </ButtonGroup>
  ) : (
    <ButtonGroup>
      <ButtonGroup.Item onClick={handleBack}>
        <Icon icon="menu" size={22} />
        &nbsp;목록
      </ButtonGroup.Item>
      <ButtonGroup.Item onClick={handleRefresh}>
        <Icon icon="again" size={22} />
        &nbsp;다시 풀기
      </ButtonGroup.Item>
    </ButtonGroup>
  );
}

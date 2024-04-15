import Button from '@/share/ui/button/Button';
import Icon from '@/share/ui/icon/Icon';

export default function QuizButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick}>
      <Icon icon="exam" size={14} />
      &nbsp; <span style={{ marginTop: '3px' }}>문제 풀이</span>
    </Button>
  );
}

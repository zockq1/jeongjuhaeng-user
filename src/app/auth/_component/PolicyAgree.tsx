import styled from 'styled-components';

import PrivacyPolicy from '@/app/auth/_component/PrivacyPolicy';
import useToggle from '@/share/hook/useToggle';
import CheckBox from '@/share/ui/checkbox/Checkbox';

interface PolicyAgreeProps {
  onSubmit: () => Promise<void>;
}

export default function PolicyAgree({ onSubmit }: PolicyAgreeProps) {
  const [isChecked, togle] = useToggle(false);
  return (
    <div>
      <PrivacyPolicy />
      <ButtonContainer>
        <AggreCheckboxButton onClick={togle}>
          <CheckBox id="policy" checked={isChecked} onChange={togle} />
          &nbsp; 동의
        </AggreCheckboxButton>

        <NextButton onClick={onSubmit} disabled={!isChecked}>
          다음
        </NextButton>
      </ButtonContainer>
    </div>
  );
}

const NextButton = styled.button`
  width: 70%;
  height: 50px;
  margin: ${({ theme }) => theme.margin.base};
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const AggreCheckboxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(30% - 10px);
  height: 50px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.textBlue};
`;

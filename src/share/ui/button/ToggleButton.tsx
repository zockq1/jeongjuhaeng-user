import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CommentOff,
  CommentOn,
  ContentBoxOff,
  ContentBoxOn,
} from '@/store/slices/toggleSlice';
import { RootState } from '@/store/store';

export default function ToggleButton() {
  const dispatch = useDispatch();
  const { isCommentOn, isContentBoxOn } = useSelector(
    (state: RootState) => state.toggle,
  );

  const handleTopicToggle = () => {
    isContentBoxOn ? dispatch(ContentBoxOff()) : dispatch(ContentBoxOn());
  };

  const handleCommentToggle = () => {
    isCommentOn ? dispatch(CommentOff()) : dispatch(CommentOn());
  };

  return (
    <ToggleButtonContainer>
      <Button onClick={handleTopicToggle}>
        {isContentBoxOn ? '전체 주제 접기' : '전체 주제 열기'}
      </Button>
      <Button onClick={handleCommentToggle}>
        {isCommentOn ? '전체 해설 접기' : '전체 해설 열기'}
      </Button>
    </ToggleButtonContainer>
  );
}

const ToggleButtonContainer = styled.div`
  display: flex;

  height: 50px;
  margin: 15px 5px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  & > button:not(:last-child) {
    border-right: 2px solid ${({ theme }) => theme.colors.textBlue};
  }
`;
const Button = styled.button`
  width: 50%;
  height: 100%;

  color: ${({ theme }) => theme.colors.textBlue};
  font-size: ${({ theme }) => theme.fontSizes.base};

  font-family: Giants-Regular;
`;

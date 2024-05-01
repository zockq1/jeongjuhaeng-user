import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@/store/store';

import Icon from '../icon/Icon';

interface KeywordCommentBoxProps {
  children?: string;
  comment?: string;
  file?: string;
  commentOff?: boolean;
}

export default function Keyword({
  children,
  comment,
  file,
  commentOff = false,
}: KeywordCommentBoxProps) {
  const { isCommentOn: isCommentOnGlobal } = useSelector(
    (state: RootState) => state.toggle,
  );
  const [isCommentOn, setIsCommentOn] = useState(
    commentOff ? false : isCommentOnGlobal,
  );

  useEffect(() => {
    if (commentOff) return;
    setIsCommentOn(isCommentOnGlobal);
  }, [isCommentOnGlobal, commentOff]);

  const toggle = () => {
    if (commentOff) return;
    setIsCommentOn((prev) => !prev);
  };

  return (
    <KeywordContainer onClick={toggle}>
      <Content>
        <div>{children}</div>
        {file && <Image src={file} />}
      </Content>
      {isCommentOn && (
        <CommentList>
          {comment ? (
            comment
              .trim()
              .split('.')
              .filter(Boolean)
              .map((item) => {
                return (
                  <Comment key={item}>
                    <CommentIcon>
                      <Icon icon="checkBox" size={12} />
                    </CommentIcon>
                    {item.trim()}
                  </Comment>
                );
              })
          ) : (
            <Comment key="-">
              <Icon icon="checkBox" size={12} /> &nbsp; -
            </Comment>
          )}
        </CommentList>
      )}
    </KeywordContainer>
  );
}

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: fit-content;
  margin: 5px;
  padding: ${({ theme }) => theme.padding.small};
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.keywordBg};

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};

  cursor: pointer;

  word-break: keep-all;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: max-content;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin: 10px 0 0;
`;

const CommentList = styled.ul`
  margin-top: 8px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
`;

const Comment = styled.li`
  display: flex;

  width: fit-content;
  margin-top: 8px;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 120%;

  word-break: keep-all;
`;

const CommentIcon = styled.div`
  flex-shrink: 0;

  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

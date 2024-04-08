import { ReactNode, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface CommentUIProps {
  isCommentOpen: boolean;
  commentList: { comment: string; icon: ReactNode }[];
  color?: string;
}

export default function Comment({
  isCommentOpen,
  commentList,
  color = '',
}: CommentUIProps) {
  const theme = useContext(ThemeContext);
  return (
    <CommentContaineer
      $open={isCommentOpen}
      $color={color || theme?.colors.lightGrey || ''}
    >
      <Triangle
        $open={isCommentOpen}
        $color={color || theme?.colors.lightGrey || ''}
      />
      {commentList.map((item, index, arr) => {
        const { comment, icon } = item;
        if (comment.includes('divider')) {
          if (index === arr.length - 1) return null;
          return (
            <CommentDivider
              $color={color || theme?.colors.grey || ''}
              key={index + comment}
            />
          );
        }
        return (
          <Description
            key={index + comment}
            $open={isCommentOpen}
            $color={color || theme?.colors.textBlue || ''}
          >
            <CommentIcon>{icon}</CommentIcon>
            {comment}
          </Description>
        );
      })}
    </CommentContaineer>
  );
}

const CommentContaineer = styled.ul<{ $open: boolean; $color: string }>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: fit-content;
  max-height: ${({ $open }) => ($open ? `600px` : '0')};
  margin-top: ${({ $open }) => ($open ? '10px' : '0')};
  padding: ${({ theme, $open }) => ($open ? theme.padding.small : '0')};
  border: 1px solid ${({ $open, $color }) => ($open ? $color : 'transparent')};
  border-radius: ${({ theme }) => theme.padding.base};

  background-color: ${({ theme, $open }) =>
    $open ? theme.colors.white : 'transparent'};

  color: ${({ $open }) => ($open ? 'inherit' : 'transparent')};

  transition: 0.1s ease-in-out;

  li:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Triangle = styled.li<{ $open: boolean; $color: string }>`
  position: absolute;
  top: ${({ $open }) => ($open ? '-6px' : '-25px')};
  left: 20px;
  z-index: 0;

  width: 10px;
  height: 10px;
  border-top: 1px solid
    ${({ $color, $open }) => ($open ? $color : 'transparent')};
  border-left: 1px solid
    ${({ $color, $open }) => ($open ? $color : 'transparent')};

  background-color: ${({ theme, $open }) =>
    $open ? theme.colors.white : 'transparent'};

  transform: rotate(45deg);
  transition: 0.1s ease-in-out;
`;

const Description = styled.li<{ $open: boolean; $color: string }>`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  width: fit-content;

  color: ${({ $color }) => $color};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme, $open }) => ($open ? theme.fontSizes.xs : 0)};
  line-height: 120%;

  word-break: keep-all;
`;

const CommentIcon = styled.div`
  flex-shrink: 0;

  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const CommentDivider = styled.div<{ $color: string }>`
  width: 100%;
  height: 1px;
  margin-bottom: 8px;

  background-color: ${({ $color }) => $color};

  opacity: 0.2;
`;

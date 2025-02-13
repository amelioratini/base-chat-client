import React from "react";
import { ChatUser } from "../types/ChatUser";
import styled from "styled-components";

const TypingIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.colors.textSecondary};
  font-style: italic;
  font-size: ${(props) => props.theme.typography.fontSize};
`;

const TypingIndicatorDotsWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-left: ${(props) => props.theme.spacing.small};
`;

const TypingIndicatorDot = styled.span`
  display: block;
  width: 6px;
  height: 6px;
  background: ${(props) => props.theme.colors.textSecondary};
  border-radius: 50%;
  animation: blink 1.5s infinite;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
`;

interface TypingIndicatorProps {
  participant: ChatUser;
}
const TypingIndicator = ({ participant }: TypingIndicatorProps) => (
  <TypingIndicatorWrapper>
    {participant.name} is typing...
    <TypingIndicatorDotsWrapper>
      <TypingIndicatorDot></TypingIndicatorDot>
      <TypingIndicatorDot></TypingIndicatorDot>
      <TypingIndicatorDot></TypingIndicatorDot>
    </TypingIndicatorDotsWrapper>
  </TypingIndicatorWrapper>
);

export default TypingIndicator;

import React from "react";
import parse from "html-react-parser";
import { ChatUser } from "../types/ChatUser";
import styled from "styled-components";

interface MessageContainerProps {
  isCurrentUser: boolean;
}

interface MessageBubbleProps {
  isCurrentUser: boolean;
}

interface MessageProps {
  text: string;
  sender: ChatUser;
  currentParticipant: ChatUser;
}

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: flex-start;
  margin: ${(props) => props.theme.spacing.small} 0;
  flex-direction: ${(props) => (props.isCurrentUser ? "row-reverse" : "row")};
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 ${(props) => props.theme.spacing.small};
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  position: relative;
`;
const MessageBubble = styled.div<MessageBubbleProps>`
  background-color: ${(props) =>
    props.isCurrentUser
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.textPrimary};
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.shadows.message};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    display: block;
    width: 0;

    ${(props) =>
      props.isCurrentUser
        ? `
      border-width: 14px 0 14px 14px;
      border-color: transparent transparent transparent ${props.theme.colors.primary};
      right: -10px;
      top: 3px;
    `
        : `
      border-width: 14px 14px 14px 0;
      border-color: transparent ${props.theme.colors.secondary} transparent transparent;
      left: -10px;
      top: 3px;
    `}
  }
`;

const SenderName = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const Message = ({ text, sender, currentParticipant }: MessageProps) => {
  const isCurrentUser = sender.id === currentParticipant.id;

  const parsedHTML = parse(text);
  return (
    <MessageContainer isCurrentUser={isCurrentUser}>
      <ProfilePicture
        src={sender.profilePicture}
        alt={`${sender.name}'s profile`}
      />
      <MessageContent>
        <SenderName>{sender.name}</SenderName>
        <MessageBubble isCurrentUser={isCurrentUser}>
          {parsedHTML}
        </MessageBubble>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;

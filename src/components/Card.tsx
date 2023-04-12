import styled from "styled-components";
import photoCover from "../img/photo-cover.svg"
import { IUsers } from "../types";

const CardWrapper = styled.div`
  width: 304px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #FFFFFF;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Photo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

export const Typografy = styled.p`
  width: 100%;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

type User = {
  userInfo: IUsers
}

const Card: React.FC<User> = ({userInfo}) => {
  return (
    <CardWrapper>
      <Section>
        <Photo src={userInfo.photo || photoCover} alt="avatar" />
      </Section>
      <Section>
        <Typografy>{userInfo.name}</Typografy>
      </Section>
      <Section>
        <Typografy>{userInfo.position}</Typografy>
        <Typografy>{userInfo.email}</Typografy>
        <Typografy>{userInfo.phone}</Typografy>
      </Section>
    </CardWrapper>
  );
}

export default Card;
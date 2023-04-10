import styled from "styled-components";
import Card from "./Card";
import { IUsers } from "../types";

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1170px) {
    width: 1170px;
  }
`;

const UsersWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap:29px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 50px;

  @media (max-width: 360px) {
    width: 328px;
  }
`;
type UsersProps = {
  usersData: IUsers[];
}

const Users: React.FC<UsersProps> = ({ usersData }) => {
  return (
    <Conteiner>
      <Title>Working with GET request</Title>
      <UsersWrapper>
        {usersData.map(user => (
          <Card key={user.id} userInfo={user} />
        ))}
      </UsersWrapper>
    </Conteiner>
  );
}

export default Users;
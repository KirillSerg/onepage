import styled from "styled-components";
import Card from "./Card";
import { IGetResponse, IUsers } from "../types";
import { Button } from "./Header";

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:50px;

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

export const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  line-height: 40px;
  // margin-bottom: 50px;

  @media (max-width: 360px) {
    width: 328px;
  }
`;
type UsersProps = {
  usersData: IGetResponse;
  setGetRespons: React.Dispatch<React.SetStateAction<IGetResponse>>;
  users: IUsers[];
  setUsers: React.Dispatch<React.SetStateAction<IUsers[]>>
}

const Users: React.FC<UsersProps> = ({ usersData, setGetRespons, users, setUsers }) => {
  const handleShowMore = () => {
    if (usersData && usersData.links.next_url) {
    fetch(usersData.links.next_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setGetRespons(data)
          setUsers(users.concat(data.users))
        } else { console.log("Error") }
      })
    }
  }

  return (
    <Conteiner>
      <Title>Working with GET request</Title>
      <UsersWrapper>
        {users.map(user => (
          <Card key={user.id} userInfo={user} />
        ))}
      </UsersWrapper>
      <Button disabled={!usersData.links.next_url ? true : false} onClick={handleShowMore} >Show more</Button>
    </Conteiner>
  );
}

export default Users;
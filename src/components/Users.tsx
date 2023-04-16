import styled from "styled-components";
import Card from "./Card";
import { Button } from "./Header";
import { GetUsers, IUsers } from "../types";

import loader from "../img/loader.png"

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
  usersData: GetUsers;
  setGetRespons: React.Dispatch<React.SetStateAction<GetUsers>>;
  users: IUsers[];
  setUsers: React.Dispatch<React.SetStateAction<IUsers[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Users: React.FC<UsersProps> = ({ usersData, setGetRespons, users, setUsers, isLoading, setIsLoading }) => {

  const handleShowMore = () => {
    if (usersData && usersData.links.next_url) {
      setIsLoading(true)
      
      fetch(usersData.links.next_url)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)

          if (data.success) {
            setGetRespons(data)
            setUsers(users.concat(data.users).sort((a, b) => b.registration_timestamp - a.registration_timestamp))
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
        {isLoading && <img src={loader} alt="loader" />}
      <Button disabled={!usersData.links.next_url ? true : false} onClick={handleShowMore} >Show more</Button>
    </Conteiner>
  );
}

export default Users;
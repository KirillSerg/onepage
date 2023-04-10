import styled from 'styled-components';
import Banner from './components/Banner';
import Header from './components/Header';
import Users from './components/Users';
import { useEffect, useState } from 'react';
import { IUsers } from './types';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 140px;
`;

const App: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users)
        } else { console.log("Error") }
        return (console.log(data))
      })
  }, [])
  console.log(users)

  return (
    <MainWrapper>
      <Header />
      <ContentWrapper>
        <Banner />
        <Users usersData={users} />
      </ContentWrapper>
    </MainWrapper>
  );
}

export default App;

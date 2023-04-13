import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGetResponse, IUsers } from './types';

import Banner from './components/Banner';
import Header from './components/Header';
import Users from './components/Users';
import Form from './components/Form';

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

const initialState: IGetResponse = {
    success: true,
    page: 0,
    total_pages: 0,
    total_users: 0,
    count: 0,
    links: {
      next_url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6',
      prev_url:null,
    },
    users: []
  }

const App: React.FC = () => {
  const [getResponse, setGetRespons] = useState<IGetResponse>(initialState)
  const [users, setUsers] = useState<IUsers[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
      .then((response) => response.json())
      .then((data: IGetResponse) => {
        if (data.success) {
          setGetRespons(data)
          setUsers(users.concat(data.users))
        } else { console.log("Error") }
      })
  }, [])

  return (
    <MainWrapper>
      <Header />
      <ContentWrapper>
        <Banner />
        <Users usersData={getResponse} setGetRespons={setGetRespons} users={users} setUsers={setUsers} />
        <Form />
      </ContentWrapper>
    </MainWrapper>
  );
}

export default App;

// import './App.css';
import styled from 'styled-components';
import Banner from './components/Banner';
import Header from './components/Header';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Get = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
`;

const App = () => {
  return (
    <MainWrapper>
      <Header />
      {/* <Conteiner> */}
        <Banner />
        <Get />
      {/* </Conteiner>   */}
    </MainWrapper>
  );
}

export default App;

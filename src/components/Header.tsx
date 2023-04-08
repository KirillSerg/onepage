import styled from "styled-components";
import {ReactComponent as Logo} from "../img/Logo.svg"

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  width: calc(100% - (16px * 2));

  @media (min-width: 1170px) {
    width: calc(1170px - (16px * 2));
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0;
`;

export const Button = styled.button`
  width: 100px;
  padding: 4px 0;
  border-radius: 80px;
  line-height: 26px;
  background-color: #F4E041;
  
  &&: hover {
    background-color: #FFE302;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <ButtonGroup>
        <Button>Users</Button>
        <Button>Sing up</Button>
      </ButtonGroup>
    </Wrapper>
  );
}

export default Header;
import styled from "styled-components";
import {ReactComponent as Logo} from "../img/Logo.svg"

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  width: calc(100% - (16px * 2));
  background-color: #FFFFFF;

  @media (min-width: 1170px) {
    padding-right: calc((100% - 1170px) / 2);
    padding-left: calc((100% - 1170px) / 2);
    width: 1170px;
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
  background-color: ${props => props.disabled ? "#B4B4B4" : "#F4E041"};
  
  &&: hover {
    background-color: ${props => props.disabled ? "#B4B4B4" : "#FFE302"};
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
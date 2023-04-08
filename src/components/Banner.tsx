import styled from "styled-components";
import bg from "../img/bg.jpg"
import { Button } from "./Header";

// const BannerWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

const BannerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 650px;
  width: 100%;

  @media (max-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1170px) {
    width: 1170px;
  }

  @media (max-width: 360px) {
    justify-content: start;
    padding-top: 40px;
  }
`;

const Title = styled.h1`
  max-width: 380px;
  padding: 0 16px;
  color: white;
  text-align: center;
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 21px;
`;

const Text = styled.p`
  max-width: 380px;
  color: white;
  text-align: center;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const Banner = () => {
  return (
    <BannerBox>
        <Title>Test assignment for front-end developer</Title>
        <Text>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </Text>
        <Button>Sing up</Button>
    </BannerBox>
  );
}

export default Banner;
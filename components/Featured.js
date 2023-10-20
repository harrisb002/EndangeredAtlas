import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";

//BG Color
//  background-color: #e6e6fa;
//  color: #e6e6fa;
//Title color: #0047ab;

const Bg = styled.div`
  background-color: #000;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  color: #40ffe8;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3.3rem;
  }
`;

const Desc = styled.p`
  color: #40ffe8;
  font-weight: normal;
  font-size: 1.3rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 400px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ animal }) {


  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>Mallard Duck</Title>
              <Desc>Description of the curent featured animal goes here.</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/animal/" + animal._id}
                  outline={1}
                  white={1}
                >
                  Show more
                </ButtonLink>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://endangeredanimals.s3.us-west-1.amazonaws.com/Mallard.jpg"
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

import styled from "styled-components";
import Link from "next/link";

const BorderBox = styled(Link)`
  background-color: #151515;
  padding: 4px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img {
    max-width: 280px;
    max-height: 280px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 280px;
    height: 280px;
    img {
      border-radius: 20px;
      max-width: 280px;
      max-height: 280px;
    }
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 2.2rem;
  color: #4682b4;
  text-decoration: none;
  margin: 0;
`;

const AnimalWrapper = styled.div``;

const AnimalInfoBox = styled.div`
  margin-top: 5px;
`;

export default function AnimalBox({ _id, species, description, images }) {
  const url = "/animal/" + _id;

  return (
    <AnimalWrapper>
      <BorderBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </BorderBox>
      <AnimalInfoBox>
        <Title href={url}>{species}</Title>
      </AnimalInfoBox>
    </AnimalWrapper>
  );
}

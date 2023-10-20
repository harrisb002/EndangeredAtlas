import { mongooseConnect } from "@/lib/mongoose";
import { Animal } from "@/models/Animal";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import AnimalImages from "@/components/AnimalImages";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

export default function AnimalPage({ animal }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <AnimalImages images={animal.images} />
          </WhiteBox>
          <div>
            <Title>{animal.species}</Title>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const animal = await Animal.findById(id);
  return {
    props: {
      animal: JSON.parse(JSON.stringify(animal)),
    },
  };
}

import styled from "styled-components";
import Center from "./Center";
import AnimalBox from "./AnimalBox";

const AnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 10px;
`;

const Bg = styled.div`
  background-color: #BFC9CA;
  padding-top: 1px;
  padding-bottom: 1000px;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin: 30px 0 10px;
  font-weight: 300px;
`;

export default function NewAnimals({ animals }) {
  return (
    <Bg>
      <Center>
        <Title>Available Datasets</Title>
        <AnimalsGrid>
          {animals?.length > 0 &&
            animals.map((animal) => <AnimalBox {...animal} />)}
        </AnimalsGrid>
      </Center>
    </Bg>
  );
}

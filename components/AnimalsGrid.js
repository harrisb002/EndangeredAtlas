import styled from "styled-components";
import AnimalBox from "@/components/AnimalBox";

const StyledAnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function AnimalsGrid({ animals }) {
  return (
    <StyledAnimalsGrid>
      {animals?.length > 0 &&
        animals.map((animal) => (
          <AnimalBox key={animal._id} {...animal} />
        ))}
    </StyledAnimalsGrid>
  );
}

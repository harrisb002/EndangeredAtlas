import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

//Styled Components
const StyledHeader = styled.header`
  background-color: #16A085;
`;
const Logo = styled(Link)`
  color: #000;
  font-weight: 600;
  font-width: normal;
  font-size: 1.5rem;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
  color: #000;
  font-size: 1.7rem;
  text-decoration: none;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Endangered Atlas</Logo>
          <StyledNav>
            <NavLink href={"/animals"}>All Animals</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

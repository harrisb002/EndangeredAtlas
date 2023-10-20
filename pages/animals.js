import { mongooseConnect } from "@/lib/mongoose";
import { Animal } from "@/models/Animal";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import AnimalsGrid from "@/components/AnimalsGrid";

export default function AnimalsPage({ animals }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Current Animals</Title>
        <AnimalsGrid Animals={animals} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const animals = await Animal.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
    },
  };
}

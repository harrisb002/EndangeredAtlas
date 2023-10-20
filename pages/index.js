import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewAnimals from "@/components/NewAnimals";
import { mongooseConnect } from "@/lib/mongoose";
import { Animal } from "@/models/Animal";

export default function HomePage({ featuredAnimal, newAnimals }) {
  return (
    <div>
      <Header />
      <Featured animal={featuredAnimal} />
      <NewAnimals animals={newAnimals} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredAnimalId = "653258346db7026e90d19b8d";
  await mongooseConnect();
  const featuredAnimal = await Animal.findById(featuredAnimalId);
  const newAnimals = await Animal.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredAnimal: JSON.parse(JSON.stringify(featuredAnimal)),
      newAnimals: JSON.parse(JSON.stringify(newAnimals)),
    },
  };
}

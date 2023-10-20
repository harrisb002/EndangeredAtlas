const { model, Schema, models} = require("mongoose");

const AnimalSchema = new Schema(
  {
    species: { type: String, required: true },
    affected: { type: Number, required: true },
    states: { type: String, required: true },
    images: [{ type: String }],
  },
)

export const Animal = models.Animal || model("Animal", AnimalSchema);

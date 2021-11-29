import { ObjectId, UUID } from "bson";

export const handleGenerateObjectId = (): ObjectId => {
  return new ObjectId(new UUID());
};

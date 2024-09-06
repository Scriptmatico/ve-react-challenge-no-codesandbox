import { CharacterModel } from "./CharacterModel";

export interface ApiResponseModel {
  info: {
    next: string | null;
    prev: string | null;
  };

  results: CharacterModel[];
}

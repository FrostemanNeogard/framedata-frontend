export type Framedata = {
  input: string;
  hitLevel: string;
  damage: string;
  startup: string;
  block: string;
  hit: string;
  counter: string;
  notes: string[];
  name: string;
  alternateInputs: string[];
  categories: string[];
};

export type SuggestionTarget = {
  game: string;
  character: string;
  input: string;
};

export type SuggestionPayload = Partial<Framedata>;

export type Suggestion = {
  _id: string;
  action: string;
  target: SuggestionTarget;
  payload: SuggestionPayload;
};

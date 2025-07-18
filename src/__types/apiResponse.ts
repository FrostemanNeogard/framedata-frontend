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

export type SuggestionPayload = {
  data?: Partial<Framedata>;
  index?: number;
};

export type Suggestion = {
  _id: string;
  action: "create" | "modify" | "delete";
  target: SuggestionTarget;
  payload: SuggestionPayload;
};

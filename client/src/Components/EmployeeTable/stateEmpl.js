import { atom } from "jotai";

const state = {
  missing: atom(false),
  missingPeople: atom([]),
};
export default state;

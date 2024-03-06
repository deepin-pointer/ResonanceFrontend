import { defineStore } from "pinia";
import { Config } from "../interfaces/storage"

export const usePersistStore = defineStore({
  id: "persist",
  state: (): Config => ({
    user: "",
    token: "",
  }),
  actions: {
  },
  persist: true,
});
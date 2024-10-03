import { writable } from "svelte/store";
// custom store for loader
const newLoading = () => {
  const { subscribe, update, set } = writable({
    status: "IDLE", // IDLE, LOADING. NAVIGATING
    message: "",
  });

  /**
   * @param {any} isLoading
   */
  function setLoading(isLoading) {
    update((state) => ({
      ...state,
      status: isLoading ? "LOADING" : "IDLE",
    }));
  }

  // @ts-ignore
  function setNavigate(isNavigating) {
    update(() => {
      return {
        status: isNavigating ? "NAVIGATING" : "IDLE",
        message: "",
      };
    });
  }

  return { subscribe, update, set, setNavigate, setLoading };
};

export const loading = newLoading();

const { subscribe, update, set } = writable({ status: "IDLE", message: "" });

/**
 * @param {boolean} isNavigating
 */
function setNavigate(isNavigating) {
  update(() => ({
    status: isNavigating ? "NAVIGATING" : "IDLE",
    message: "",
  }));
}

export { subscribe, setNavigate };

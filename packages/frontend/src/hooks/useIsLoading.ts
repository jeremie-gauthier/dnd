export const useIsLoading = <State>(state: State | undefined) => {
  const isLoading = state === undefined;

  return isLoading ? { state, isLoading } : { state, isLoading };
};

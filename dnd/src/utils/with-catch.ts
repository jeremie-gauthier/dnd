export const withCatch =
  (function_: (...arguments_: any[]) => Promise<void>) =>
  async (...arguments_: any[]) => {
    try {
      await function_(...arguments_);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      console.error(`[-] Error while running withCatch(fn) (${errorMessage})`);
    }
  };

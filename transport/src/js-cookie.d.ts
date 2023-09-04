declare module 'js-cookie' {
    const cookies: {
      get: (name: string) => string | undefined;
      set: (name: string, value: string, options?: object) => void;
      remove: (name: string, options?: object) => void;
    };
    export = cookies;
  }
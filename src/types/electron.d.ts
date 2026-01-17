export {};

declare global {
  interface Window {
    electron: {
      notify: (title: string, body: string) => void;
    };
  }
}

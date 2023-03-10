export const sleep = () =>
  new Promise(resolve => {
    setTimeout(() => resolve('Hello, World after 2.5s'), 2500);
  });

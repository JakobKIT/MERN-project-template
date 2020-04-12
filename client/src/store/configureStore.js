import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

const selectedStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const { configureStore } = selectedStore;

export const { history } = selectedStore;

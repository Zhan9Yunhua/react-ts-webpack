import { History, Location } from 'history';

declare global {
  const APP_ENV: string;

  interface IClassName {
    className?: string;
  }

  interface IWithRouterProps {
    location?: Location<any>;
    history?: History;
    match?: match;
  }

  interface IStore {
    userStore: UserStore.IUserStore;
    globalStore: GlobalStore.IGlobalStore;
    articleStore: ArticleStore.IArticleStore;
    messageStore: MessageStore.IMessageStore;
    routerStore: RouterStore.IRouterStore;
  }
}

interface match {
  params: any;
  isExact: boolean;
  path: string;
  url: string;
}
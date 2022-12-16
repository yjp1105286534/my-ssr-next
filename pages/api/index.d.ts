import { IronSession } from 'iron-session';
import { IUserInfo } from 'store/userStore';

export type IComment = {
  id: number,
  content: string,
  create_time: Date,
  update_time: Date,
};

export type IArticle = {
  id: number,
  title: string,
  content: string,
  views: number,
  create_time: Date,
  update_time: Date,
  user: IUserInfo,
  comments: IComment[],
};

export type ISession = IronSession & Record<string, any>;

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  user : {
    name: string;
  }
};
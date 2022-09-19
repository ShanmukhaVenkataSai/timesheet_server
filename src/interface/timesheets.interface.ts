export interface PostTimeSheet {
  data:{
    name: string;
    hours: number;
    minutes: number;
  }[]
  date: string;
  timezone: string;
  user:string;
}

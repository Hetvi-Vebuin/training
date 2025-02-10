type user = {
  id: number;
  username: string;
  email:string,
  password: string;
  role: string;
};

type tokenType = { id: number; role: string };

type updateType={
  id:number,
  email?:string,
  username?:string,
  password?:string,
}

type userDetails = {
  id: number;
  username: string;
  role: string;
};


type registerType={
  username: string;
  email:string,
  password: string;
  role: string;
}
export { user, userDetails, tokenType, updateType, registerType };

import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const registerUser = async (data) => {
  console.log(data);
  const result = await createUserWithEmailAndPassword(
    auth,
    data?.email,
    data?.password
  );
  return result;
};

export const loginUser = async (data) => {
  const userCred = await signInWithEmailAndPassword(
    auth,
    data?.email,
    data?.password
  );
  return userCred;
};

// auth.js
import { getAuth } from "firebase/auth";
import app from "./Firebase.config"; 

const auth = getAuth(app);
export default auth;
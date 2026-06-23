import axios from "axios";

const frigate = axios.create({
  baseURL: "http://localhost:5000",
});

export default frigate;
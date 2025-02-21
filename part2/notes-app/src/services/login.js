import axios from "axios";

const baseUrl="http://localhost:3001/api/login";
const login = async (user) => {
    const loggedinUser= await axios.post(baseUrl,user);
    return loggedinUser.data;
};

export default {login};  
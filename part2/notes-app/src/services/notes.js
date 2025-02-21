import axios from "axios";

const baseUrl="http://localhost:3001/api/notes";
const getAll = () => {
    return axios.get(baseUrl).then((result=>result.data));
};
const create=(newObject,token)=>{
    return axios.post(baseUrl,newObject,{headers: {Authorization: `Bearer ${token}`}}
    );
}
const update= (id,updatedNote) => {
    return axios.put(`${baseUrl}/${id}`,updatedNote);
}
export default {getAll,create,update}; 
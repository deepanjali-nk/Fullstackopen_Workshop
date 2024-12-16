import axios from "axios";

const baseUrl="http://localhost:3001/notes";
const getAll = () => {
    return axios.get(baseUrl).then((result=>result.data));
};
const create=(newObject)=>{
    return axios.post(baseUrl,newObject);
}
const update= (id,updatedNote) => {
    return axios.put(`${baseUrl}/${id}`,updatedNote);
}
export default {getAll,create,update}; 
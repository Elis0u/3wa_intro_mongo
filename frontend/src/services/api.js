import axios from "axios";


async function getDatas(url){
    try{
        return await axios.get(url);
    } catch(error) {
        throw new Error(error)
    }
}

async function addData(url, data) {
  try {
    return await axios.post(url, data);
  } catch (error) {
    throw new Error(error);
  }
}

async function editData(url, data, config = {}) {
  try {
    const response = await axios.put(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteData(url, id) {
    try {
      return await axios.delete(url, { data: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }


export { getDatas, deleteData, addData, editData};
import axios from 'axios';


const useAjax = (callback) => {

  const getElement = url => {
    axios.get(url)
      .then(res => {
        console.log(res);
        
        callback([...res.data]);
      })
  };

  const postElement = (url, data) => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };

    axios.post(url, data, options).then().catch(console.error);
  };

  const putElement = (url, data) => {
    axios.put(url, data)
      .then(response => {
        console.log(response)
      })
  };

  const deleteElement = (url, id2) => {
    let id = { _id: id2 };
    axios.delete(url, {data:id})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  return [getElement, postElement, putElement, deleteElement];
}

export default useAjax;
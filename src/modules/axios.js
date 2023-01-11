import axios from 'axios';

function get(url,params){
axios({
    method: 'get',
    url: url,
    responseType: 'application/json'
  })
  .then(function (response) {return response})
  .catch(function(error){alert(error)})

}

export default{
    get
}
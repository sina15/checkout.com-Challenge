
import axios from 'axios'

//make initial api call to get master ref
export const fetchMasterRef = async(url)=>{
   try {
    let response = await axios.get(url);

    if(response.status == 200 && response.data){
        let {forms:{everything:{action,method,enctype}},refs} = response.data;
        return {
            action,
            method,
            enctype,
            ref:refs[0].ref
        }
    }else{
        console.error("Api failed with status "+response.status);
        return {};
    }
   } catch (error) {
       console.error("Api failed",error)
       return {}
   }
}

//make search api call with master ref
export const fetchProducts = async (action, ref, enctype) => {
    try {
        let response = await axios.get(action, {
            params: { ref: ref },
            headers: { "Content-Type": enctype }
        })
        let {data:{title,body}} = response.data.results[0];

        return {title,body};

    } catch (error) {
         return {}
    }
}


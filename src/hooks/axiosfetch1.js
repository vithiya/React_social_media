import axios from 'axios';
import { useEffect, useState} from 'react'

const useAxiosFetch = (dataUrl) => {
    const [data,setData]=useState([]);
    const [fetchError,setFetchError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        let isMounted=true;
        //const source=axios.CancelToken.source();

        const fetchData=async (url)=>{
                setIsLoading(true);
                console.log('here');
                try{
                    console.log('here1');
                    // const response = await axios.get(url,{cancelToken:source.token});
                    const response = await axios.get(url);
                    console.log('here2');
                    console.log("data"+response);
                    if(isMounted){
                        console.log("data"+response);
                        setData(response.data);
                        setFetchError(null);
                    }
                }catch(err){
                    console.log('here3'+err.message);
                    if(isMounted){
                        console.log('here4');
                        setFetchError(err.message);
                        setData([]);
                    }
                }finally{
                    isMounted && setIsLoading(false);
                }
        }

        fetchData(dataUrl);
        

        const cleanup =()=>{
            isMounted=false;
           // source.cancel();
        }
        return cleanup();
    },[dataUrl]);
  return {data,fetchError,isLoading};
}

export default useAxiosFetch
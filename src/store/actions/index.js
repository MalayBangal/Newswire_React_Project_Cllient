import axios from "axios";

const fatchNewsHelper = async ()=>{
    try {
       const res = await axios.get('http://localhost:3001/news');
    //    console.log(res.data);
       return res.data;
    } catch (error) {
        console.log(error);
    }
}

const fatchNewsByIdHelper = async (id)=>{
    try {
       const res = await axios.get(`http://localhost:3001/news/${id}`);
    //    console.log(res.data);
       return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchNews = () => {
	return {
		type: 'fetch_news',
		payload: fatchNewsHelper()
	};
};

export const fetchNewsById = (id) =>{
    return{
        type:'fetch_news_by_id',
        payload:fatchNewsByIdHelper(id)
    };
};
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {fetchNewsById} from '../store/actions/index';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import axios from 'axios';
const ShowNews = () => {

  const newsItem = useSelector((store) => store.newsReducer.newsItem);
    console.log(newsItem);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
   

    useEffect(()=>{
        dispatch(fetchNewsById(params.id))
    },[dispatch,params]);

    const deleteNewsFromDb = async ()=>{
      await axios.delete(`http://localhost:3001/news/${params.id}`);
      toast.success('successfully deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/');
    }
  return (
    <React.Fragment>

    {newsItem ?
        <div className='article_container'>
        <h1>{newsItem.title}</h1>
        <div className='image' style={{backgroundImage:`url(${newsItem.image})`}} ></div>
        <div className='author' >
            <span>Created by : {newsItem.author}</span>
            <div>Created At : {<Moment format="lll">{newsItem.createdAt}</Moment>}</div>
        </div>
        <div className='my-3 content' >
             {newsItem.content}
        </div>
        <LinkContainer to={`/news/${newsItem._id}/edit`} >
          <button className='mb-3 btn btn-warning' >Edit</button>
        </LinkContainer>
        <LinkContainer to={`/news/${newsItem._id}`} >
          <button onClick={deleteNewsFromDb} className='ms-3 btn btn-danger mb-3' >Delete</button>
        </LinkContainer>
        </div>
   :null}

    </React.Fragment>
  )
}

export default ShowNews;
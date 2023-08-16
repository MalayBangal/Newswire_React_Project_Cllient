import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; //! for Validation
import Alert from 'react-bootstrap/Alert';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchNewsById} from '../store/actions/index';
import axios from 'axios';
import {toast} from 'react-toastify'

const EditNews = () => {
  const newsItem = useSelector((store) => store.newsReducer.newsItem);
    // console.log(newsItem);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
   
    const [newsValues, setValues] = useState({
      title:'',
	    content:'',
	    author:'',
	    image:''
    })

    useEffect(()=>{
        dispatch(fetchNewsById(params.id))
        .then(()=>{
          setValues(newsItem);
        })
    },[dispatch,params]);

    const updateNewsInDb = async (values)=>{
      try {
        const news = {
          title: values.title,
          content: values.content,
          author: values.author,
          image: values.image
        };
        await axios.patch(`http://localhost:3001/news/${params.id}`,{news});
        toast.success('Successfully updated the news', {
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
      } catch (error) {
        console.log(error);
      }
    }

  const formik = useFormik({   //! getFieldProps() doc
    initialValues: {
      title:newsValues.title,
	    content:newsValues.content,
	    author:newsValues.author,
	    image:newsValues.image
    },
    enableReinitialize:true, //! formic 1 bar empty value ta change kore state er value deyar jonno .
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      content: Yup.string()
        .required('Required'),
      author: Yup.string().max(15,'Must be 15 character or less').required('Required'),
      image: Yup.string().url('Muat be a valid url').required('Image is required'),
    }),
    onSubmit: async values => {
      await updateNewsInDb(values);
    },
  });
  return (
    <div className='row'>
      <div className='col-lg-7 mx-auto'>

    <form onSubmit={formik.handleSubmit}>
      <div className='mb-3' >
        <label className='form-label' htmlFor="title">Title</label>
        < input className='form-control'
        id="title"
        type="text"
        {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title ? (
          <Alert className='mt-2' variant={'danger'}>{formik.errors.title}</Alert>
        ) : null}

      </div>

      <div className='mb-3' >

      <label className='form-label' htmlFor="content">Content</label>
      < input className='form-control' id="content" type="text" {...formik.getFieldProps('content')} />
      {formik.touched.content && formik.errors.content ? (
       <Alert className='mt-2' variant={'danger'}>{formik.errors.content}</Alert>
      ) : null}

      </div>

      <div className='mb-3' >

      <label className='form-label' htmlFor="author">Author</label>
      < input className='form-control' id="author" type="author" {...formik.getFieldProps('author')} />
      {formik.touched.author && formik.errors.author ? (
        <Alert className='mt-2' variant={'danger'}>{formik.errors.author}</Alert>
      ) : null}

      </div>

      <div className='mb-3' >

      <label className='form-label' htmlFor="image">Image</label>
      < input className='form-control' id="image" type="text" {...formik.getFieldProps('image')} />
      {formik.touched.image && formik.errors.image ? (
        <Alert className='mt-2' variant={'danger'}>{formik.errors.image}</Alert>
      ) : null}

      </div>

      <button className='btn btn-primary' type="submit">Submit</button>
    </form>

      </div>
    </div>
  );
}

export default EditNews;
import React, { useEffect } from 'react';
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchNews } from '../store/actions/index'

const Home = () => {

    const allNews = useSelector((store) => store.newsReducer.allNews)
    console.log(allNews)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchNews())
    },[dispatch])

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      }
  return (
        <React.Fragment>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {allNews? allNews.map((ele,idx)=>{

                    return(
                        <div key={idx} >
                            <img src={ele.image} className="responsive-img" />
                            <div className="author">
                                <span>{ele.author}</span>
                            </div>
                            <div className="content">
                                <div className="title">{ele.title}</div>
                                <div className="excerpt">{ele.content}</div>
                                <LinkContainer to={`/news/${ele._id}`}>
                                    <button className="mt-3 btn btn-primary" variant="light">
                                        Read More
                                    </button>
                                </LinkContainer>
                            </div>
                        </div>
                        )
                    })
                    :null}
            </Masonry>
        </React.Fragment>
  )
}

export default Home;
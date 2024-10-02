import React from 'react'
import {useParams, useNavigate, Link} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"



function BookDetails() {
  
  const params= useParams()
  const navigate= useNavigate()
  
  const [bookToShow, setBookToShow]= useState(null)
  const [isShowDelete, setIsShowDelete]= useState(false)
  
  useEffect(()=>{
    getData()
  }, [])

  const getData= async ()=> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/books/${params.bookId}`)
      setBookToShow(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = ()=> {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/books/${params.bookId}`)
    .then(()=>{
      navigate("/books")
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  if (bookToShow === null){
    return (<h3>... loading</h3>)
  }

  let starEmojis;
  if (bookToShow.rating === 1){
    starEmojis = "⭐"
  } else  if (bookToShow.rating === 2){
    starEmojis = "⭐⭐"
  }else  if (bookToShow.rating === 3){
    starEmojis = "⭐⭐⭐"
  }else  if (bookToShow.rating === 4){
    starEmojis = "⭐⭐⭐⭐"
  }else  if (bookToShow.rating === 5){
    starEmojis = "⭐⭐⭐⭐⭐"
  }

  return (
    <div className="book-details">
      <h2>{bookToShow.title}</h2>
      <img src={bookToShow.image} style={{width:"200px"}}/>
      <Link to={`/authors/${bookToShow.authorId}`}>
      <p>Author: {bookToShow.author}</p>
      </Link>
      <p>"{bookToShow.summary}"</p>
      <p>Pages: {bookToShow.pages}</p>
      <p>Published: {bookToShow.published}</p>
      <p>Genre: {bookToShow.genre}</p>
      <p>Rating: {starEmojis}</p>
      {/*<p>Write your opinion: bla bla{bookToShow.review}</p>*/}

      <Link to={`/books/${params.bookId}/edit`}>
      <button>Edit</button>
      </Link>

      <button onClick={()=> setIsShowDelete(true)}>Delete</button>
      {isShowDelete && (
        <div>
          <p>Are you sure you want to <strong>delete </strong> the book? </p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={()=> setIsShowDelete(false)}>No</button>
        </div>
      )}
    </div>
  )
}

export default BookDetails
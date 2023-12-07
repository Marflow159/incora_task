import axios from "axios"
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Feed from "../pages/feedPage";

import { useHttp } from "../../hooks/http.hook";
import MainPage from "../pages/MainPage";

import './App.scss'
import FeedItemPage from "../pages/feedItemPage";

function App() {

  const { request } = useHttp();

  const [articlesNasa, setArticlesNasa] = useState([])
  const [articlesReddit, setArticlesReddit] = useState([])
  const [articlesMobile, setArticlesMobile] = useState([])

  const [userNum, setUserNum] = useState()

  const [feed, setFeed] = useState()

  const [restartWeb, setRestartWeb] = useState(false)

  let status
  if (localStorage.getItem("signInStatus") !== null) {
      status = localStorage.getItem("signInStatus");
  } else {
      status = 'false'
  }
  const [sign, setSign] = useState(status)

  console.log(sign);
  const getArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/")
      setArticlesNasa(res.data[0])
      setArticlesReddit(res.data[1])
      setArticlesMobile(res.data[2])

    } catch (error) {
      console.log(error);
    }
  }

  const getFeed = () => {
    request(`http://localhost:3001/feed?userId=${userNum}`, "GET")
      .then(data => {
        setFeed(data)
        console.log(data);
        localStorage.setItem("feedItems", JSON.stringify(data))})
  }

  const onDeleteFeed = (id) => {
    request(`http://localhost:3001/feed/${id}`, "DELETE")
    setRestartWeb(!restartWeb)
  }

  const onPostFeed = (feed) => {
    request(`http://localhost:3001/feed`, 'POST', JSON.stringify(feed))
    setRestartWeb(!restartWeb)
  }

  useEffect(() => {
    getArticles()
    if (userNum !== undefined) {
      getFeed()
    }
    // eslint-disable-next-line
  }, [userNum, restartWeb])


  const getDatasFromForm = (num, sign) => {
    setSign(sign)
    setUserNum(num)
  }

  return (
    <>
      <Router>
        <header className="header">
          <Link to='/'><h1>Incora Test Task</h1></Link>
        </header>

        <Routes>
          <Route path="/" element={<MainPage getDatasFromForm={getDatasFromForm} feed={feed} sign={sign} onDeleteFeed={onDeleteFeed} onPostFeed={onPostFeed} />} />
        </Routes>

        <Routes>
          <Route path={`/:feedId`} element={<Feed articlesNasa={articlesNasa} articlesReddit={articlesReddit} articlesMobile={articlesMobile} />} />
        </Routes>

        <Routes>
          <Route path={'/:feedId/:titleId'} element={<FeedItemPage articlesNasa={articlesNasa} articlesReddit={articlesReddit} articlesMobile={articlesMobile} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

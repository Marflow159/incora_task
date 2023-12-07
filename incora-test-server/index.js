import cors from "cors"
import express from "express"
import RSSParser from "rss-parser"

const feedURLNasa = "https://www.nasa.gov/news-release/feed/"
const feedURLReddit = "https://www.reddit.com/.rss"
const feedURLMobile = "https://www.mobileworldlive.com/latest-stories/feed/"
const parser = new RSSParser()
let articles = [];


const parse = async (urlNasa, urlReddit, urlMobile) => {
    const feedNasa = await parser.parseURL(urlNasa)
    const feedReddit = await parser.parseURL(urlReddit)
    const feedMobile = await parser.parseURL(urlMobile)

    let nasa = [],
        reddit = [],
        mobile = []

    feedNasa.items.forEach(item => {
        nasa.push({ item })
    })

    feedReddit.items.forEach(item => {
        reddit.push({ item })
    })

    feedMobile.items.forEach(item => {
        mobile.push({ item })
    })

    articles.push(nasa)
    articles.push(reddit)
    articles.push(mobile)
}

parse(feedURLNasa, feedURLReddit, feedURLMobile)

let app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send(articles)
})

const server = app.listen("4000", () => {
    console.log("app start");
})

export default server
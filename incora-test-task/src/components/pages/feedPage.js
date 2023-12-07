import { useParams, Link } from 'react-router-dom';
import React from 'react';
import "./pages.scss"

const FeedPage = ({ articlesNasa, articlesReddit, articlesMobile }) => {
    const { feedId } = useParams()

    let feedData,
        logoElement
    if (feedId === 'nasa') {
        feedData = articlesNasa
        logoElement = <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo@2x.png" alt="" />
    } else if (feedId === 'reddit') {
        feedData = articlesReddit
        logoElement = <img src="https://play-lh.googleusercontent.com/i_ZabizifODPnMgIMkyi_nIirJp73q6BbZWLkkUEiTIuHnQkuADH5xdEl2S-2LZubTA" alt="" />

    } else if (feedId === 'mobile') {
        feedData = articlesMobile
        logoElement = <img src="https://cdn.cookielaw.org/logos/418be9c1-b062-45b1-9339-dbb6d1750748/03b4633e-9ceb-4415-b054-89cb8aefce35/a7ceff13-853e-4734-997e-ae1123d23672/Screenshot_2021-04-06_at_22.45.11.png" alt="" />

    }

    let elements
    if (feedData.length === 0) {
        elements = <h2>not feed yet</h2>
    } else {
        elements = feedData.map((item, i) => {
            const { title, link, pubDate } = item.item

            let formatted = { day: "numeric", month: "long", year: "numeric" }
            let articleDate = new Date(pubDate).toLocaleDateString("uk-UA", formatted)

            return (
                <Link key={i} className="feed__item" to={`/${feedId}/${title}`}>
                    <h3>{title}</h3>
                    <p>{articleDate}</p>
                </Link>
            )
        })


    }

    return (
        <>
            <Link className="backButton" to={`/`}>Back</Link>
            <div className='feed'>
                {logoElement}
                {elements}
            </div>
        </>
    )
}

export default FeedPage
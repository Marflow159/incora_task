import { Link, useParams } from "react-router-dom";


const FeedItemPage = ({ articlesNasa, articlesReddit, articlesMobile }) => {
    const { feedId } = useParams()
    const { titleId } = useParams()

    let feedData;
    if (feedId === 'nasa') {
        feedData = articlesNasa
    } else if (feedId === 'reddit') {
        feedData = articlesReddit
    } else if (feedId === 'mobile') {
        feedData = articlesMobile
    }

    let element = feedData.map(item => {
        const { title } = item.item
        if (title === titleId) {
            const htmlString = Object.values(item.item)[4];
            const theObj = { __html: htmlString };
            let elem = <div dangerouslySetInnerHTML={theObj} />
            return (
                <div className="container">
                    {elem}
                </div>

            )
        }
    })
    return (
        <>
            <Link className="backButton" to={`/${feedId}`}>Back</Link>
            {element}
        </>
    )
}

export default FeedItemPage
import { useState, useEffect } from "react"

import './userFeed.scss'
import { useHttp } from "../../hooks/http.hook"

const UserFeed = ({ feed, sign, onDeleteFeed,onPostFeed,userId}) => {
    const { request } = useHttp()

    const [numOfView, setNumOView] = useState(3)
    const [moreButtonStatus, setMoreButtonStatus] = useState(true)
    const [addFormStatus, setAddFormStatus] = useState(false)

    const [allFeed, setNewAllFeed] = useState()
    const [feedAddStatus, setFeedStatus] = useState(false)
    const [sendStatul, setSendStatud] = useState(false)

    useEffect(() => {
        request(`http://localhost:3001/feed`, "GET")
            .then(data =>setNewAllFeed(data))
            
    }, [sendStatul])

    let elements = feed.map (item => item).reverse().map((e, i) => {
        if (i + 1 <= numOfView) {
            return (
                <>
                    <div key={i} className="yourFeed__item">
                        <h3>{e.title}</h3>
                        <p>{e.body}</p>
                        <button onClick={() => {
                            onDeleteFeed(e.id)
                            }}>delete</button>
                    </div>

                </>
            )   
        }
    })

    const onMoreFeed = () => {
        setMoreButtonStatus(false)
        setNumOView(feed.length)
    }

    const OnAddFeedForm = (e) => {
        e.preventDefault()
        let feedObj = {
            userId: userId,
            id: allFeed[allFeed.length - 1].id + 1,
            title: e.target[0].value,
            body: e.target[1].value
        }

        e.target[0].value = ''
        e.target[1].value = ''

        setFeedStatus(true)
        onPostFeed(feedObj)
        setSendStatud(!sendStatul)
    }
    const checkSignStatus = () =>{
        console.log(sign);
        if (sign === 'false') {
            return 'd00'
        } else if (sign === 'true') {
            return 'd01'
        }
    }

    return (
        <>
            <div className={`yourFeed ${checkSignStatus()}`}>
                <div className="yourFeed__add">
                    <h1>Your feed</h1>
                    <button onClick={() => {
                        setAddFormStatus(true) 
                        setFeedStatus(false)}}>add feed</button>

                    <form className={`yourFeed__add__form ${addFormStatus === true ? 'd01' : 'd00'}`} onSubmit={(e) => OnAddFeedForm(e)} >
                        <div>
                            <label htmlFor="username" required>title</label>
                            <textarea id="username" name="title" rows='3' cols='40' onChange={() => setFeedStatus(false)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="password" required>body</label>
                            <textarea id="username" name="body" rows='6' cols='40' onChange={() => setFeedStatus(false)}></textarea>
                        </div>

                        <p className={feedAddStatus === false ? 'd00': 'd01'}>feed posted</p>
                        <button type="submit">add</button>

                        <div className="closeForm" onClick={() => setAddFormStatus(false)}>-</div>
                    </form>

                </div>
                {elements}
                {moreButtonStatus === false ? null : <button onClick={() => onMoreFeed()}>More</button>}
            </div>

        </>
    )
}

export default UserFeed
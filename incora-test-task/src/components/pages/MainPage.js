import { Link } from 'react-router-dom';

import SignIn from "../signIn/SignIn"
import UserFeed from "../userFeed/userFeed"
import { useState } from 'react';

import './pages.scss'
const MainPage = ({ getDatasFromForm, feed, sign, onDeleteFeed, onPostFeed }) => {
    const [userId, setUserId] = useState()

    const getUserId = (userIdd) => {
        setUserId(userIdd)
    }

    if (localStorage.getItem("feedItems") !== null) {
        feed = JSON.parse(localStorage.getItem("feedItems"))
    }
    return (
        <>
            <SignIn getDatasFromForm={getDatasFromForm} getUserId={getUserId} />
            {feed !== undefined ?
                <UserFeed
                    feed={feed}
                    sign={sign}
                    onDeleteFeed={onDeleteFeed}
                    onPostFeed={onPostFeed}
                    userId={userId}
                /> :
                null}
            <div className="allfeed">

                <Link to={`/${'nasa'}`}>
                    <div className="nasa-feed">
                        <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo@2x.png" alt="" />
                    </div>
                </Link>


                <Link to={`/${'mobile'}`}>
                    <div className="nasa-feed">
                        <img src="https://cdn.cookielaw.org/logos/418be9c1-b062-45b1-9339-dbb6d1750748/03b4633e-9ceb-4415-b054-89cb8aefce35/a7ceff13-853e-4734-997e-ae1123d23672/Screenshot_2021-04-06_at_22.45.11.png" alt="" />
                    </div>
                </Link>

                <Link to={`/${'reddit'}`}>
                    <div className="nasa-feed">
                        <img src="https://play-lh.googleusercontent.com/i_ZabizifODPnMgIMkyi_nIirJp73q6BbZWLkkUEiTIuHnQkuADH5xdEl2S-2LZubTA" alt="" />
                    </div>
                </Link>

            </div>
        </>
    )
}

export default MainPage
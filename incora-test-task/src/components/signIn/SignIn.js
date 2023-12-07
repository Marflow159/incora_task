import { useEffect, useState } from "react"
import "./signIn.scss"

import { useHttp } from "../../hooks/http.hook.js"

const SignIn = ({ getDatasFromForm, getUserId }) => {


    const { request } = useHttp();
    const [users, setUsers] = useState([])
    const [feed, setFeed] = useState()
    const usersURL = "https://jsonplaceholder.typicode.com/users"
    let status
    if (localStorage.getItem("signInStatus") !== null) {
        status = localStorage.getItem("signInStatus");

    } else {
        status = 'false'
    }
    const [signIn, setSignIn] = useState(status)
    useEffect(() => {
        request(usersURL)
            .then(data => {
                setUsers(data)
            })
        // eslint-disable-next-line
    }, [])

    const signOut = () => {
        console.log(1);
        setSignIn('false')
        localStorage.setItem("signInStatus", "false")
    }

    const OnSignForm = (e) => {
        e.preventDefault()

        users.forEach(user => {
            if (user.username.toLowerCase() === e.target[0].value.toLowerCase().trim()) {
                getUserId(user.id)
                setFeed(user.id)
                setSignIn('true')
                localStorage.setItem("signInStatus", "true")
            }
        })
    }

    if (feed !== undefined) {
        getDatasFromForm(feed, signIn)
    }

    const checkSignStatus = (e) => {
        if (e === 'but') {
            if (signIn === 'false') {
                return 'd0'
            } else if (signIn === 'true') {
                return 'd1'
            }
        } else if (e === 'form') {
            if (signIn === 'false') {
                return 'd1'
            } else if (signIn === 'true') {
                return 'd0'
            }
        }

    }
    return (
        <>
            <button onClick={() => signOut()} className={`signOut ${checkSignStatus('but')}`}>Sign Out</button>

            <form className={`formSign ${checkSignStatus('form')}`} onSubmit={(e) => OnSignForm(e)}>
                <div>
                    <input type="text" name="username" id="username" required />
                    <label htmlFor="username">username</label>
                </div>

                <div>
                    <input type="password" name="password" id="password" required />
                    <label htmlFor="password">password</label>
                </div>

                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default SignIn
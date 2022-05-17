import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function RoomLists() {
    const [roomLists, setRoomLists] = useState([])
    const [room, setRoom] = useState('')

    useEffect(() => {
      fetch('http://localhost:3001/v1/chat/rooms/', {
            credentials: "include",
        })
      .then((data) => data.json())
      .then((data) => setRoomLists(data))
      .catch((err) => console.log(err));
    },[])

    

    return (
        <>
        {
            roomLists.map(rooms => {
                return(
                    <>
                    <h1>{rooms.Room}</h1>
                    <h2>{rooms.User.Username}</h2>
                    <Link to={`/chatAdmin?room=${rooms.Room}`}>
                    <button type="button">Chat</button>
                    </Link>
                    </>
                )
            })
        }
        <h1>Hi There, This is Room Lists</h1>
        </>
    )
}
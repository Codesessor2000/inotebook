import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6639f960c57dcbc228d18b7a",
            "user": "66388b39b820508cf9859d73",
            "title": "Title-1",
            "description": "skdcbjisdubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66328d18b7a",
            "user": "66388b39b59d73",
            "title": "Title-2",
            "description": "skdcbjisdub   12345 6789 cisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        },
        {
            "_id": "66d18b7a",
            "user": "6638f9859d73",
            "title": "Title-3",
            "description": "skdcbjisdsdvsdcs    oishd9uchsibhu    ubcisdbciksd!",
            "tag": "gggggggg",
            "date": "2024-05-07T09:50:24.083Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
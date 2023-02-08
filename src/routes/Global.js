import DiaryPage from "components/DiaryPage";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Global = ({ userObj }) => {
    const [diaries, setDiaries] = useState([]);
    useEffect(()=> {
        // snapshot은 실시간으로 변함
        dbService.collection("diaries").onSnapshot(snapshot => {
            const diaryArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setDiaries(diaryArray)
        })
    }, [])

    return(
        <div>
            <div class="large">Global</div>
            <div class="diary-wrap">
                {diaries.filter((data)=> data.global === true).map((diary) =>(
                    <DiaryPage 
                    key={diary.id} 
                    userObj={userObj} 
                    diaryObj={diary} 
                    isOwner={diary.createrId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}
export default Global;
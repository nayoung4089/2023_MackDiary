import React, { useState } from "react";
import Diary from "./Diary";

const DiaryPage = ({userObj, diaryObj, isOwner}) => {
    // 완전 맨 앞에 보여지는 거 (사진을 클릭하면 자세히 보는 Diary.js로 이동)
    const [showEdit, setShowEdit] = useState(false);

    const onClick = () => {
        setShowEdit(prev => !prev);
    }

    return(
        <>
        {!showEdit ? 
        <div class="diary-box">
        {diaryObj.attachmentUrl && 
        <button class="image-button" onClick={onClick}>
            <img src={diaryObj.attachmentUrl} width="50px" height="50px" alt="saved"/>
        </button>}
        <div class="title">{diaryObj.title}</div>
        </div> : 
        <>
        <div class="bg" />
        <div class="diary-shown-wrap">
        <button class="initial" onClick={onClick}>X</button>
        <Diary 
        userObj={userObj} 
        diaryObj={diaryObj} 
        isOwner={isOwner}
        />
        </div>
        </>}
        </>
    )

}
export default DiaryPage;
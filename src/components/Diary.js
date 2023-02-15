import { dbService } from "fbase";
import React, { useState } from "react";
import DiaryFactory from "./DiaryFactory";
import "css/Diary.css";

const Diary = ({userObj, diaryObj, isOwner}) => {
    // 자세한 페이지 : 남의 거나 내거나 모두
    const [newTitle, setNewTitle] = useState(diaryObj.title);
    const [editing, setEditing] = useState(false);
    const [newStrong, setNewStrong] = useState(diaryObj.strong);
    const [newDeep, setNewDeep] = useState(diaryObj.deep);
    const [newFast, setNewFast] = useState(diaryObj.fast);
    const [newDiary, setNewDiary] = useState(diaryObj.text);
    const [newAttachment, setNewAttachment] = useState("");
    const [newSaveImage, setNewSaveImage] = useState(diaryObj.saveImage);

    let loadableCanvas;

    // 내가 주인일 때만 버튼이 나오기
    // 지우기 버튼
    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 일기를 지우시겠습니까?");
        console.log(ok);
        if(ok){
            await dbService.doc(`diaries/${diaryObj.id}`).delete();
        }
    }
    // 수정 버튼
    const toggleEditing = () =>{
        setEditing(prev => !prev);
    };
    
    return(
        <>
        <>
        <div>
            {isOwner && 
            <div class="button-wrap">
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
            </div>
            }
            {
                editing? (
                <>
                    <DiaryFactory 
                    saveableCanvas={loadableCanvas}
                    isOwner={isOwner}
                    title={newTitle}
                    setTitle={setNewTitle}
                    strong={newStrong}
                    setStrong={setNewStrong}
                    deep={newDeep}
                    setDeep={setNewDeep}
                    fast={newFast}
                    setFast={setNewFast}
                    diary={newDiary} 
                    setDiary={setNewDiary} 
                    saveData={newSaveImage}
                    attachment={newAttachment}
                    setAttachment={setNewAttachment}
                    saveImage={newSaveImage}
                    setSaveImage={setNewSaveImage}
                    makeNew={false}
                    diaryObj={diaryObj}
                    setClear={setEditing}
                    onClick={toggleEditing}
                    />
                </>
                ) : (
                <>
                <div class="diary">
                <h3>{diaryObj.date}</h3>
                <h3>{diaryObj.title}</h3>
                {diaryObj.attachmentUrl && <img src={diaryObj.attachmentUrl} width="300px" height="200px" alt="saved"/>}
                <div class="select-box">
                    <div>세기: {diaryObj.strong}</div>
                    <div>위치: {diaryObj.deep}맥</div>
                    <div>빠르기: {diaryObj.fast}맥</div>
                </div>
                <div class="detail-box">{diaryObj.text}</div>
                </div>
                </>
                )
            }
        </div>
        </>
        </>
    )
}

export default Diary;
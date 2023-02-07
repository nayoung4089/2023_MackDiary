import { dbService } from "fbase";
import React, { useState } from "react";
import DiaryFactory from "./DiaryFactory";

const Diary = ({userObj, diaryObj, isOwner}) => {
    // 자세한 페이지 : 남의 거나 내거나 모두
    const [editing, setEditing] = useState(false);
    const [newDiary, setNewDiary] = useState(diaryObj.text);
    const [newAttachment, setNewAttachment] = useState("");
    const [newSaveImage, setNewSaveImage] = useState(diaryObj.saveImage);

    let loadableCanvas;

    // 내가 주인일 때만 버튼이 나오기
    // 지우기 버튼
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this diary?");
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
                <div>
                    <span>{diaryObj.date}</span>
                    <span>작성자: {userObj.displayName}</span>
                </div>
                {diaryObj.attachmentUrl && <img src={diaryObj.attachmentUrl} width="300px" height="300px" />}
                <h4>{diaryObj.text}</h4>
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
import React, { useState } from "react";
import { dbService } from "fbase";
import AutoHeightTextarea from "./AutoHeightTextarea";
import CanvasDraw from "react-canvas-draw";

const DiaryFactory = ({ saveableCanvas, diary, setDiary, saveData, userObj, attachment, setAttachment, saveImage, setSaveImage, makeNew, diaryObj, setClear, onClick }) => {
    const [global, setGlobal] = useState(false);
    // input 창만 전적으로 담당
    const onErase = () => {
        saveableCanvas.eraseAll();
    };
    const onUndo = () => {
        saveableCanvas.undo();
    }
    const onGlobal = () => {
        setGlobal(prev => !prev);
    }

    // diaryFactory onSubmit
    const onSubmit = async (event) => {
        event.preventDefault();
        saveImage = saveableCanvas.getSaveData(); // edit 시 불러오기 위해
        attachment = saveableCanvas.getDataURL(); // url로 변경
        setAttachment(attachment);
        setSaveImage(saveImage);
        let nowDate = new Date();
        const diaryObj = {
            text: diary,
            createdAt: nowDate,
            date: `${nowDate.getFullYear()}/${nowDate.getMonth()+1}/${nowDate.getDate()}`,
            createrId: userObj.uid,
            attachmentUrl: attachment,
            saveImage: saveImage,
            global: global
        }
        await dbService.collection("diaries").add(diaryObj);
        setDiary(""); // 입력창 공란으로 만들어주기
        setClear(false);
    };

    const onEditSubmit = async (event) => {
        event.preventDefault();
        // 변경된 이미지 저장
        saveImage = saveableCanvas.getSaveData(); // edit 시 불러오기 위해
        attachment = saveableCanvas.getDataURL(); // url로 변경
        setAttachment(attachment);
        setSaveImage(saveImage);
        // 업데이트
        await dbService.doc(`diaries/${diaryObj.id}`).update({
            text: diary,
            attachmentUrl: attachment,
            saveImage: saveImage,
            global: global,
        })
        setClear(false);
    }
    return(
        <>
        <div class="bg" />
        <div class="form-wrap">
        <div class="button-wrap">
            <button onClick={onErase}>EraseAll</button>
            <button onClick={onUndo}>뒤로가기</button>
            <button onClick={onGlobal}>{global ? "공개": "비공개"}</button>
            <button class="initial" onClick={onClick}>X</button>
        </div>
        <form onSubmit={makeNew ? onSubmit : onEditSubmit}>
            <CanvasDraw 
            ref={(canvasDraw)=>(saveableCanvas = canvasDraw)}
            saveData={saveData}
            canvasWidth={300}
	        canvasHeight={300}
            brushRadius={5}
            />
            <AutoHeightTextarea diary={diary} setDiary={setDiary} />
            <input type="submit" value="Save" />
        </form>
        </div>
        </>
    )

}
export default DiaryFactory;
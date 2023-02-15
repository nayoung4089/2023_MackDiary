import React, { useState } from "react";
import { dbService } from "fbase";
import AutoHeightTextarea from "./AutoHeightTextarea";
import CanvasDraw from "react-canvas-draw";

const DiaryFactory = ({ saveableCanvas, title, setTitle, strong, setStrong, deep, setDeep, fast, setFast, diary, setDiary, saveData, userObj, attachment, setAttachment, saveImage, setSaveImage, makeNew, diaryObj, setClear, onClick }) => {
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
    const onChange = (event, setTitle) => {
        const {
          target: { value },
        } = event;
        setTitle(value);
        console.log(value);
    };

    // diaryFactory onSubmit
    const onSubmit = async (event) => {
        event.preventDefault();
        saveImage = saveableCanvas.getSaveData(); // edit 시 불러오기 위해
        attachment = saveableCanvas.getDataURL(); // url로 변경
        setAttachment(attachment);
        setSaveImage(saveImage);
        let nowDate = new Date();
        const diaryObj = {
            title: title,
            strong: strong,
            deep: deep,
            fast: fast,
            text: diary,
            createdAt: new Date(),
            date: `${nowDate.getFullYear()}년 ${nowDate.getMonth()+1}월 ${nowDate.getDate()}일`,
            createrId: userObj.uid,
            attachmentUrl: attachment,
            saveImage: saveImage,
            global: global
        }
        await dbService.collection("diaries").add(diaryObj);
        setTitle(""); // 입력창 공란으로 만들어주기
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
            title: title,
            strong: strong,
            deep: deep,
            fast: fast,
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
            <button onClick={onErase}>초기화</button>
            <button onClick={onUndo}>뒤로가기</button>
            <button onClick={onGlobal}>{global ? "공개": "비공개"}</button>
            <button class="initial" onClick={onClick}>X</button>
        </div>
        <form onSubmit={makeNew ? onSubmit : onEditSubmit}>
            <input
              type="text"
              placeholder="예상되는 맥 & 제목"
              value={title}
              required
              onChange={(event)=>{onChange(event,setTitle)}}
            />
            <CanvasDraw 
            ref={(canvasDraw)=>(saveableCanvas = canvasDraw)}
            saveData={saveData}
            canvasWidth={300}
	        canvasHeight={200}
            brushRadius={5}
            enablePanAndZoom
            style={{padding:'20px 0'}}
            />
            <h4>
                <span>세기 </span>
                <select name="strong" onChange={(event)=>{onChange(event,setStrong)}} value={strong}>
                    <option value="유력">유력</option>
                    <option value="평">평</option>
                    <option value="무력">무력</option>
                </select>
                <span>위치 </span>
                <select name="deep" onChange={(event)=>{onChange(event,setDeep)}} value={deep}>
                    <option value="부">부</option>
                    <option value="평">평</option>
                    <option value="침">침</option>
                </select>
                <span>빠르기 </span>
                <select name="fast" onChange={(event)=>{onChange(event,setFast)}} value={fast}>
                    <option value="지">지</option>
                    <option value="평">평</option>
                    <option value="삭">삭</option>
                </select>
            </h4>
            <AutoHeightTextarea diary={diary} setDiary={setDiary} />
            <input type="submit" value="Save" />
        </form>
        </div>
        </>
    )

}
export default DiaryFactory;
import DiaryFactory from "components/DiaryFactory";
import DiaryPage from "components/DiaryPage";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const MainPage = ({ userObj }) => {
    // 기본 이미지들만 있다가 + 누르면 신규 생성 / 사진은 DiaryPage로 관리
    const [title, setTitle] = useState("");
    const [diary, setDiary] = useState("");
    let [attachment, setAttachment] = useState("");
    const [diaries, setDiaries] = useState([]);
    const [make, setMake] = useState(false);
    let [saveImage, setSaveImage] = useState("");
    let saveableCanvas;

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

    const onClick = () => {
        setMake(prev => !prev);
    }

    return (
        <>
        <div class="diary-wrap">
        {diaries
            .filter((data)=> data.createrId === userObj.uid)
            .map((diary) =>(
                <DiaryPage 
                key={diary.id} 
                userObj={userObj} 
                diaryObj={diary} 
                isOwner={diary.createrId === userObj.uid}
                />
        ))}
        </div>
        <button class="big-button" onClick={onClick}>+</button>
        {make && 
        <>
        <DiaryFactory 
        saveableCanvas = {saveableCanvas}
        title={title}
        setTitle={setTitle}
        diary={diary} 
        setDiary={setDiary} 
        userObj={userObj} 
        saveData={""}
        attachment={attachment}
        setAttachment={setAttachment}
        saveImage={saveImage}
        setSaveImage={setSaveImage}
        makeNew={true} 
        setClear={setMake}
        onClick={onClick}
        />
        </>}
        </>
    )
}
export default MainPage;
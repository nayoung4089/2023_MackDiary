import { authService } from "fbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
    const navigating = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigating(`/`); // 로그인 창으로 돌아가기 (새로고침 해야 돌아가니까 App.js 바꿔주기)
    }

    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
          await userObj.updateProfile({
            displayName: newDisplayName,
        }); // 같은 이름이면 업데이트 되지 않게
        refreshUser(); // 이름 변경 시 바로 제목도 변경 가능하게
        }
    };
    return(
        <>
        <div class="title">안녕하세요, {userObj.displayName}님!</div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="display name" value={newDisplayName} />
            <input type="submit" value="업데이트" />
        </form>
        <button onClick={onLogOutClick}>로그아웃</button>
        </>
    )
}
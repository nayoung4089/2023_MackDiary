import { useState } from "react";

const AutoHeightTextarea = ({diary, setDiary}) => {
    // 줄바꿈 위치를 저장하는 Dictionary
    const [lineBreakIndexDict, setLineBreakIndexDict] = useState({});
    // 줄 수 (높이)
    const [lineHeight, setLineHeight] = useState(0);

    // 사용자 입력 업데이트 및 줄바꿈 감지
    const checkItemChangeHandler = (event) => {
        const {
            target:{value},
        } = event;
        setDiary(value);
        // Scroll이 생기면 line break
        if (event.target.scrollHeight !== event.target.clientHeight) {
            setLineHeight(prev => prev+1);	// textarea 높이 늘리고
            setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length-1]: 1});	// 줄바꿈 위치 저장
        }
        else {
	    // 다시 줄바꿈 지점으로 오면 line break 취소
            if (lineBreakIndexDict[event.target.value.length]) {
                setLineHeight(prev => prev-1);	// textarea 높이 줄이고
                setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 0});	// Dictionary에서 삭제
            }
        }
    }

    // 너비 초과로 인한 줄바꿈 말고 사용자가 엔터를 입력했을 때의 줄바꿈 처리
    const checkItemEnterHandler = (event) => {
        if (event.key === 'Enter') {
            // textarea 높이는 checkItemChangeHandler에서 변경됨
            setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 1}); // 줄바꿈 위치 저장
        }
    }    
    return (
        <div className="autoHeightTextarea">
        <textarea
            type='text'
            value={diary}
            placeholder="오늘의 맥진 일기"
            onChange={checkItemChangeHandler}
            onKeyDown={checkItemEnterHandler}
            style={{
                padding: '5%',
                width: '90%',
                height: ((lineHeight * 40) + 40) + 'px'}}
        />
    </div>
    )
}

export default AutoHeightTextarea;
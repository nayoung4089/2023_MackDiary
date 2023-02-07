import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{
                data = await authService.signInWithEmailAndPassword(
                    email, password
                )
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) =>!prev );
    }
    return(
        <>
        <div class="title">웰컴 👋🎉</div>
        <form onSubmit ={onSubmit}>
            <input name = "email" type ="text" placeholder="이메일" required value={email} onChange={onChange}/>
            <input name = "password" type="password" placeholder="비밀번호" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "계정 만들기" : "로그인"} />
            {error}
        </form>
        <button className="log button" onClick={toggleAccount}>{newAccount ? "로그인하기": "계정 만들기"}</button>
        </>
    )

};
export default AuthForm;
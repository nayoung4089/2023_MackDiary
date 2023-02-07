import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => 
<>
    <div class="nav">
        <Link to ="/global">🌏</Link>
        <Link to ="/profile">🙎</Link>
    </div>
    <div class="large"><Link to="/">🩺 맨날맥날</Link></div>
</>
export default Navigation;
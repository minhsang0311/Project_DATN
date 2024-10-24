// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SpMoi from './SpMoi';
import SpMostView from './SpMostView';

function Home() {


    return (
        <div className="home">
            <SpMoi />
            <SpMostView />
        </div>
    );
}
export default Home;

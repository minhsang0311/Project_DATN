// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SpMoi from './SpMoi';
import SpMostView from './SpMostView';
import Banner from "./Banner";
import '../styles/components/Home.css'


function Home() {

    return (
        <div className="home">
            <Banner />
            <SpMoi />
            <SpMostView />
        </div>
    );
}
export default Home;

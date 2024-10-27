
import SpMoi from './SpMoi';
import SpMostView from './SpMostView';
import '../styles/components/Home.css'


function Home() {

    // useEffect ( () => {
    //    fetch("http://localhost:3000/user/productList")
    //    .then(res=>res.json()).then(data => ganListSP(data));
    // } , []);

    return (
        <div className="home">
            <SpMoi />
            <SpMostView />
        </div>
    );
}
export default Home;

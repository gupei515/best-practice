import { useParams } from "react-router-dom";

const Home = () => {
    const { id } = useParams();
    console.log("id equals", id);
    return <>Home</>;
};

export default Home;

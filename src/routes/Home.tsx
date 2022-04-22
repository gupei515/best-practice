import { useParams } from "react-router-dom";

export const Home = () => {
    const { id } = useParams();
    console.log("id equals", id);
    return <>Home</>;
};

import HallControlls from "../components/Hall/HallControlls";
import HallMain from "../components/Hall/HallMain";

const Hall = () => {
    return (
        <div className="hall-background">
            <HallControlls />

                <HallMain />

        </div>
    );
}

export default Hall;
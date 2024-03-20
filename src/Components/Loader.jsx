import Lottie from "lottie-react";
import loader from "./Lottie/loader.json";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Lottie animationData={loader} loop={true} autoplay={true} />
    </div>
  );
};

export default Loader;

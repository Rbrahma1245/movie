import "./Header.scss";
import Video from "../Lottie/Video.json";
import Lottie from "lottie-react";

const Header = () => {
  return (
    <div className="header-container">
      {/* <Lottie animationData={Video} loop={true} autoplay={true}  color="#FF0000" className="lottie"/> */}
      <p>ENTERTAINMENT HUB</p>
      <Lottie animationData={Video} loop={true} autoplay={true}  color="#FF0000" className="lottie"/>

      
    </div>
  );
};

export default Header;

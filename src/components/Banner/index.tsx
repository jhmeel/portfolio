import { Link } from "react-router-dom";
import { memo } from "react";
import { RoughNotation } from "react-rough-notation";
import { useSpring, animated } from "react-spring";
import { FaFileDownload } from "react-icons/fa";
import { Format } from "../../Types";
import { getRandomColor } from "../../utils";
import cv from "../../assets/Jhmeel_Software_Engineer_CV.pdf";
import "./style.scss";

function Banner(): React.ReactElement {
  const handleCVDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = cv;
    anchor.download = "JHMEEL_CV.pdf";
    anchor.click();
  };

  const fadeInProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    delay: 200,
    config: { tension: 200, friction: 15 },
  });

  const bounceProps = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.9)" },
    config: { tension: 300, friction: 10 },
    reset: true,
  });

  return (
    <animated.div style={fadeInProps} className="banner">
      <h1 className="banner-heading">{`Hi, I am ${Format.shortname}`}</h1>
      <p className="banner-occupation">
        An enthusiastic {Format.occupation} with {Format.experience} years of
        experience
      </p>
      <p className="banner-cta">
        Read more
        <Link className="banner-link" to="/about">
          <RoughNotation
            show
            type="highlight"
            animationDelay={250}
            animationDuration={2000}
            color={getRandomColor()}
          >
            about me
          </RoughNotation>
        </Link>
        or
        <Link to="/" className="banner-link">
          <RoughNotation
            show
            type="highlight"
            animationDelay={250}
            animationDuration={2000}
            color={getRandomColor()}
          >
            contact me
          </RoughNotation>
        </Link>
      </p>
      <animated.button
        onClick={handleCVDownload}
        style={{
          color: "#ffffff",
          fontWeight: "600",
          background: "#3498db",
          marginTop: "18px",
          width: "145px",
          padding: "10px 20px",
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
          borderRadius: "7px",
          ...bounceProps,
        }}
      >
        <FaFileDownload />
        View Resume
      </animated.button>
    </animated.div>
  );
}

export default memo(Banner);

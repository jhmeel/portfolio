import React from "react";
import { useSpring, animated, config } from "react-spring";
import { FaAward} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import userImg from "../../assets/portfolio_avatar.png";
import "./style.scss";
import { Header } from "../../components/Form";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import cv from "../../assets/Jhmeel_Software_Engineer_CV.pdf";
import MetaData from "../../components/MetaData";

const handleCVDownload = () => {
  const anchor = document.createElement("a");
  anchor.href = cv;
  anchor.download = "JHMEEL_CV.pdf";
  anchor.click();
};

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const rotateIn = useSpring({
    from: { transform: "rotate(10deg)" },
    to: { transform: "rotate(0deg)" },
    config: { duration: 500 },
  });
  const companyData = [
    {
      Icon: "",
      name: "Curebase",
      role: "Senior Software Engineer",
      description:
        "Led development of advanced clinical trial management systems, improving efficiency by 40%.",
    },
    {
      Icon: "",
      name: "Zapier",
      role: "Cloud Solutions Architect",
      description:
        "Designed and implemented scalable Azure cloud solutions for enterprise clients.",
    },
  ];
  return (
    <>
      <MetaData title="About" />
      <animated.section id="about" style={fadeIn}>
        <Header title="About" />

        <div className="about_container">
          <div className="about_me">
            <animated.div className="about_me-image" style={rotateIn}>
              <img src={userImg} alt="About Image" loading="lazy"/>
            </animated.div>
          </div>

          <div className="about_content">
            <div className="about_cards">
              <animated.div className="about_card" style={fadeIn}>
                <FaAward className="about_icon" />
                <h5>Experience</h5>
                <small>5+ years</small>
              </animated.div>

              <animated.div className="about_card" style={fadeIn}>
                <FiUsers className="about_icon" />
                <h5>Clients</h5>
                <small>Global Companies</small>
              </animated.div>

              <animated.div className="about_card" style={fadeIn}>
                <VscFolderLibrary className="about_icon" />
                <h5>Projects</h5>
                <small>15+ Completed</small>
              </animated.div>
            </div>

            <div className="about_content">
              <animated.p style={fadeIn}>
                As a dedicated <b>Software Engineer</b> with a BSc in Computer
                Science, I bring <b>over 5 years of practical experience</b> to the
                table. My journey in tech has been nothing short of
                extraordinary, leading me to collaborate with some of the most
                renowned companies in the industry. This diverse experience has
                not only honed my technical skills but also provided me with a
                unique perspective on solving complex technological challenges.
              </animated.p>

              <div className="company_experiences">
                {companyData.map((company, index) => (
                  <animated.div
                    key={index}
                    className="company"
                    style={useSpring({
                      from: { opacity: 0, transform: "translateY(50px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                      delay: index * 100,
                      config: config.molasses,
                    })}
                  >
                    <h3 style={{textDecoration:'underline'}}>{company.name}</h3>
                    <h4>{company.role}</h4>
                    <p>{company.description}</p>
                  </animated.div>
                ))}
              </div>

              <animated.p style={fadeIn}>
                Throughout my career, I've been deeply committed to the tech
                community and the principles of open-source development. I've
                contributed to several high-impact open-source projects,
                including <b>FastAPI</b>, where my contributions helped improve the
                WebSocket handling capabilities, resulting in a 30% reduction in
                latency for real-time applications.
              </animated.p>

              <animated.p style={fadeIn}>
                As a firm believer in knowledge sharing, I've authored over 20
                technical articles on topics ranging from advanced algorithms to
                emerging technologies like blockchain and quantum computing. My
                articles, published on platforms such as Medium and dev.to, have
                garnered thousands of views and have been instrumental in
                helping fellow developers tackle complex technical challenges.
              </animated.p>

              <animated.p style={fadeIn}>
                I'm particularly passionate about leveraging technology to
                create solutions that have a tangible impact on people's lives.
                Whether it's optimizing healthcare systems, enhancing user
                experiences, or pushing the boundaries of what's possible with
                code, I approach each project with enthusiasm and a commitment
                to excellence.
              </animated.p>

              <animated.p style={fadeIn}>
                Looking ahead, I'm excited about the possibilities that emerging
                technologies like AI and quantum computing present. I'm
                constantly updating my skills and exploring new areas of tech to
                ensure I remain at the cutting edge of our rapidly evolving
                industry.
              </animated.p>
            </div>

            <animated.div style={fadeIn}>
              <span className="btn btn-primary" onClick={handleCVDownload}>
                View Resume
              </span>
            </animated.div>
          </div>
        </div>
      </animated.section>
      <Footer />
    </>
  );
};

export default About;

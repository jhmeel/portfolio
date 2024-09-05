import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import "./style.scss";
import {
  FaGithub,
  FaGlobe,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { projects } from "../../Types";
import { Link } from "react-router-dom";
import StackList from "../Stacklist";

const ProjectItem = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const fade = useSpring({
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? "scale(1.1)" : "scale(1)",
    config: { duration: 1000 },
  });

  const drawerAnimation = useSpring({
    bottom: selectedProject !== null ? "0%" : "-100%",
    config: { tension: 300, friction: 30 },
  });

  const imageTransitions = useTransition(currentImageIndex, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedProject !== null) {
      interval = setInterval(() => {
        const project = projects[selectedProject];
        if (project.screenshots && project.screenshots.length > 0) {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % project.screenshots.length
          );
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedProject]);

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
    setCurrentImageIndex(0);
  };

  const handleCloseDrawer = () => {
    setSelectedProject(null);
  };

  const handlePrevImage = () => {
    if (selectedProject !== null) {
      const project = projects[selectedProject];
      if (project.screenshots && project.screenshots.length > 0) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1
        );
      }
    }
  };

  const handleNextImage = () => {
    if (selectedProject !== null) {
      const project = projects[selectedProject];
      if (project.screenshots && project.screenshots.length > 0) {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % project.screenshots.length
        );
      }
    }
  };

  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <div
          className="project-cont"
          key={i}
          onClick={() => handleProjectClick(i)}
        >
          <div className="project-avatar">
            <span className={isLoading ? "blur_overlay" : ""}></span>
            <animated.img
              style={fade}
              onLoad={() => setIsLoading(false)}
              src={p.banner || "https://via.placeholder.com/800x400"}
              loading="lazy"
              alt={p.title}
            />
          </div>
          <div className="p-meta">
            <div className="p-info">
              <span className="p-name">{p.title}</span>
              <span className="p-desc">{p.description}</span>
            </div>
            <StackList stack={p.stack} />
            <div className="btn-cont">
              <button className="btn-live">
                <FaGlobe /> <Link to={p.website}>View live</Link>
              </button>
              <button className="btn-repo">
                <FaGithub />
                <Link to={p.repository}>repo</Link>
              </button>
            </div>
          </div>
        </div>
      ))}

      <animated.div style={drawerAnimation} className="project-drawer">
        {selectedProject !== null && (
          <>
            <button className="close-btn" onClick={handleCloseDrawer}>
              <FaTimes />
            </button>
            <div className="drawer-content">
              <h2>{projects[selectedProject].title}</h2>
              <div className="screenshot-container">
                {imageTransitions((style, index) => (
                  <animated.img
                    style={{...style,objectFit:'contain'}}
                    src={projects[selectedProject].screenshots[index]}
                    alt={`Screenshot ${index + 1}`}
                  />
                ))}
                <button className="nav-btn prev-btn" onClick={handlePrevImage}>
                  <FaChevronLeft />
                </button>
                <button className="nav-btn next-btn" onClick={handleNextImage}>
                  <FaChevronRight />
                </button>
              </div>
              <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                {projects[selectedProject].description}
              </p>
              <StackList stack={projects[selectedProject].stack} />
              <div className="btn-cont">
                <button className="btn-live">
                  <FaGlobe />{" "}
                  <Link to={projects[selectedProject].website}>View live</Link>
                </button>
                <button className="btn-repo">
                  <FaGithub />
                  <Link to={projects[selectedProject].repository}>repo</Link>
                </button>
              </div>
            </div>
          </>
        )}
      </animated.div>
    </div>
  );
};

export default ProjectItem;

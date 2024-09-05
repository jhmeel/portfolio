import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import "./style.scss";
import { H2 } from "../../components/Form";
import { FaProjectDiagram } from "react-icons/fa";
import ProjectItem from "../../components/ProjectItem";
import MetaData from "../../components/MetaData";

const Home = (): React.ReactElement => {
  return (
    <>
      <MetaData title="Home" />
      <section id="home">
        <Header />
        <Banner />
        <H2>
          <FaProjectDiagram /> My Recent Projects
        </H2>
        <ProjectItem />
      </section>
      <Footer />
    </>
  );
};

export default Home;

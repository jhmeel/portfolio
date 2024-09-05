import React from "react";
import "./style.scss";
import { Header } from "../../components/Form";
import Footer from "../../components/Footer";
import StackList from "../../components/Stacklist";
import { WorkStack } from "../../Types";
import MetaData from "../../components/MetaData";
const Skills = () => {
  return (
    <>
      <MetaData title="Skills" />
      <section id="skills-cont">
        <Header title="Skills"></Header>
        <StackList stack={WorkStack} />
      </section>
      <Footer />
    </>
  );
};

export default Skills;

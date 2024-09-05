import React, { useState, useCallback } from "react";
import { useSpring, animated, config } from "react-spring";
import { FaTimes } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import toast from "react-hot-toast";
import "./style.scss";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [enquiry, setEnquiry] = useState("");

  const handleToggle = () => setIsOpen(!isOpen);

  const botSpring = useSpring({
    transform: isOpen ? "scale(1)" : "scale(0)",
    opacity: isOpen ? 1 : 0,
    config: config.gentle,
  });

  const buttonSpring = useSpring({
    opacity: isOpen ? 0 : 1,
    config: config.gentle,
  });

  const sendEmail = (e) => {
    e.preventDefault();
    if (!subject) {
      toast.error("Subject is required!");
      return;
    } else if (!enquiry || enquiry.length < 5) {
      toast.error("Please provide a valid message!");
      return;
    }
    const url = `mailto:jhmeel02@gmail.com?subject=${subject}&body=${enquiry}`;
    window.open(url, "_blank");
    setSubject("");
    setEnquiry("");
    toast.success("Email sent successfully!");
  };

  return (
    <div className="bot-wrapper">
       <animated.div style={buttonSpring}>
        <button className="bot-button" onClick={handleToggle}>
          <BiMessageSquareDetail />
          <div className="hire-me-container">
            {[...Array(10)].map((_, index) => (
              <span key={index} className={`hire-me hire-me-${index}`}>
                Hire me
              </span>
            ))}
          </div>
        </button>
      </animated.div>
      <animated.div style={botSpring}>
        <div className="bot-container">
          <div className="bot-header">
            <h2 className="bot-title">Contact Me</h2>
            <button className="close-button" onClick={handleToggle}>
              <FaTimes />
            </button>
          </div>
          <div className="contact-options">
            <div className="contact-option" onClick={() => window.open("mailto:jhmeel02@gmail.com", "_blank")}>
              <div className="contact-icon email-icon"><MdOutlineEmail /></div>
              <span>Email</span>
            </div>
            <div className="contact-option" onClick={() => window.open("", "_blank")}>
              <div className="contact-icon messenger-icon"><RiMessengerLine /></div>
              <span>Messenger</span>
            </div>
            <div className="contact-option" onClick={() => window.open("https://wa.me/+2348081434636", "_blank")}>
              <div className="contact-icon whatsapp-icon"><BsWhatsapp /></div>
              <span>WhatsApp</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={sendEmail}>
            <input
              className="input"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Your Message"
              rows={5}
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            />
            <button className="submit-button" type="submit">Send</button>
          </form>
        </div>
      </animated.div>
    </div>
  );
};

export default Contact;
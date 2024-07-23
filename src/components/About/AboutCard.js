import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Roey Zalta </span>
            from <span className="purple"> Kfar Sava, Israel.</span>
            <br />
            I am Machine Learning Developer with experience in Python, data analysis, and model development.
            <br />
            Apart from coding & Cool AI creations, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing with My Cats
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Post On linkedin
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling with My Beautiful Wifw
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Roey</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

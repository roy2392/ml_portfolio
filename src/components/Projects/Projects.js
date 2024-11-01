import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import yad2Image from '../../Assets/Projects//yad2.png';
import websitechat from '../../Assets/Projects//chatwebsite.png';
import kafka from '../../Assets/Projects//kafka.png';
import loan from '../../Assets/Projects//loan.png';
import book from '../../Assets/Projects//book.jpg';
import cat from '../../Assets/Projects//cat.gif';
import got from '../../Assets/Projects//GOT.png';
import crew from '../../Assets/Projects//crew.png';
import aws from '../../Assets/Projects//aws.png';

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={websitechat}
              isBlog={false}
              title="Chat with a Website via LLM Agent"
              description="An AI-powered tool that allows users to interact with websites through natural language conversations. It combines Large Language Models with web scraping to navigate sites, extract information, and answer queries about web content"
              ghLink="https://github.com/roy2392/chat-with-websites-agent"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={got}
              isBlog={false}
              title="Chat-GPThrones - Chatbot with Game of Thrones Graph Knowledge-base"
              description="GenAI-powered chat application that leverages Neo4j to build a knowledge base graph from the Game of Thrones books."
              ghLink="https://github.com/roy2392/chat-gpthornes"
              
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={crew}
              isBlog={false}
              title="AI-Powered Research Agent Crew - LLM Agents-base company Swarm"
              description="An AI-driven research assistant leveraging LangChain, BeautifulSoup, and multiple APIs for web scraping, content summarization, Google searches, and Airtable integration. This project orchestrates multiple specialized agents to collaboratively perform complex research tasks, streamline workflows, and manage interactions efficiently through a coordinated group chat system."
              ghLink="https://github.com/roy2392/research-agent-crew"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={kafka}
              isBlog={false}
              title="Real-time news search engine using Upstash Kafka and Vector DB"
              description="n design, build and operate a real-time news search engine using live ingested data from various news APIs."
              ghLink="https://github.com/roy2392/search-engine-kafka-vectordb"
              demoLink="https://search-engine-kafka-vectordb-mrblx47kbnsddduwh4xuem.streamlit.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={loan}
              isBlog={false}
              title="Loan Prediction Model via FastAPI"
              description="A real-time API-integrated machine learning model that classifies and predicts load capacity efficiently using advanced algorithms"
              ghLink="https://github.com/roy2392/loan-pred-model"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={book}
              isBlog={false}
              title="Deep Learning Book Recommendation System"
              description="a Book Recommendation System using various machine learning techniques. The goal is to provide users with personalized book recommendations based on their preferences and interactions with the system."
              ghLink="https://github.com/roy2392/books_recom_sys"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={yad2Image}
              isBlog={false}
              title="Real-Time Yad2 Real Estate Scraper with Twilio WhatsApp Notifications"
              description="a real-time real estate scraper for the Yad2 website that sends new listings via WhatsApp using the Twilio API. "
              ghLink="https://github.com/roy2392/yad2whatsappautomation/tree/main"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cat}
              isBlog={false}
              title="Image Classification: Cat vs. Wild Cat"
              description="image classification project using CNN to distinguish between cats and wild cats."
              ghLink="https://github.com/roy2392/cat_or_wild_cat_image_classifier_ex?tab=readme-ov-file#image-classification-cat-vs-wild-cat"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aws}
              isBlog={false}
              title="Spam Detection Lambda Function"
              description="This project implements a serverless spam detection system using AWS Lambda, S3, and PostgreSQL"
              ghLink="https://github.com/roy2392/aws_batch_predictions_with_RDS"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

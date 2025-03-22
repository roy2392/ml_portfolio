import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Particle from "../Particle";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Medium articles using RSS feed
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@roeyzalta")
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setArticles(data.items);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching Medium posts:", error);
        setLoading(false);
      });
  }, []);

  // Extract cover image from article content
  const extractImage = (content) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Articles </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are my published articles on Medium
        </p>
        
        {loading ? (
          <div className="text-center" style={{ color: "white", padding: "50px 0" }}>
            <h3>Loading articles...</h3>
          </div>
        ) : articles.length > 0 ? (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {articles.map((article, index) => (
              <Col md={4} key={index} className="project-card">
                <Card className="project-card-view">
                  <Card.Img 
                    variant="top" 
                    src={article.thumbnail || extractImage(article.content) || "https://miro.medium.com/fit/c/300/180/1*6ahbWjp_g9hqhaTDSJOL1Q.png"} 
                    alt={article.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text style={{ textAlign: "justify" }}>
                      {new Date(article.pubDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Card.Text>
                    <Card.Text style={{ textAlign: "justify" }}>
                      {article.categories.map((category, idx) => (
                        <span key={idx} className="badge bg-primary me-1 mb-1">{category}</span>
                      ))}
                    </Card.Text>
                    <Button
                      variant="primary"
                      href={article.link}
                      target="_blank"
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center" style={{ color: "white", padding: "50px 0" }}>
            <h3>No articles found. Check back later!</h3>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default Articles;
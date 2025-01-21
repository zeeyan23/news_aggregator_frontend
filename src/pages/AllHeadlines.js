import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Container, Stack, Row, Col, Card, Form } from 'react-bootstrap';
import styles from '../pages/newspages.module.css';

const AllHeadlines = () => {
  const location = useLocation();
  const { remainingItems } = location.state || { remainingItems: [] };

  const [searchTerm, setSearchTerm] = useState('');
  
      // Filter items based on the search term
      const filteredItems = remainingItems.filter(
          (item) =>
              item.subsection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.published_date?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
            <Stack className={styles.wrap}>
                <Form.Control 
                    size="lg" 
                    type="text" 
                    className={styles.searchTerm} 
                    placeholder="Search news..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{background:"grey", color:"white"}}/>
            </Stack>
            <Container className="p-3 p-sm-4 p-md-5 p-lg-5 p-xl-5">
            
            <Stack direction="horizontal" className="w-100">
                <Row className="g-3 g-sm-4 g-md-4 g-lg-4 g-xl-4 pt-5 p-sm-4 p-md-5 p-lg-5 p-xl-5">
                    {filteredItems.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                            <Card style={{ width: '100%' }} className="h-100"> {/* Ensures cards are flexible in width and fill available space */}
                                <Card.Img 
                                    variant="top" 
                                    src={item.url_to_image || "https://via.placeholder.com/150"}
                                    alt={item.title || "Article Image"} 
                                    className="img-fluid"
                                />
                                <Card.Body className="p-3"> {/* Adds padding to the card body */}
                                    <Card.Title>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-dark text-decoration-none"
                                        >
                                            {item.title || "Untitled"}
                                        </a>
                                    </Card.Title>
                                    <Card.Text className={styles.descriptionText}>
                                        {item.abstract || "No description available."}
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">
                                            {new Date(item.published_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </small>
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">
                                            {item.subsection || ""}
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Stack>
            </Container>
        </>
  );
};

export default AllHeadlines;

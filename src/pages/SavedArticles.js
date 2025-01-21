import { useEffect, useState } from "react";
import { mainURL } from "../Utils/urlis";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import styles from '../pages/savedarticles.module.css';
function SavedArticles(){

    const [allArticles, setArticles]=useState([]);
    const userId = window.localStorage.getItem("id");
    useEffect(()=>{
            fetchAllArticles();
        },[])

    const fetchAllArticles= async()=>{
        try {
          const response = await axios.get(
            `${mainURL}/api/fetchAllSavedArticles`, {
                params: { user_id: userId },
              });
        
              const articles = response.data.map((item) => item.news); 
              setArticles(articles); 
        } catch (error) {
          console.log('Error:', error); 
          if (error.response) {
              console.log('Server Error:', error.response.data); 
          } else if (error.request) {
              console.log('Network Error:', error.request); 
          } else {
              console.log('Other Error:', error.message); 
          }
        }
      }

      return(
        <>
            <NavigationBar />
            <Container className={styles.listContainer}>
                <Stack direction="horizontal" className="w-100 p-5">
                    <Row>
                    {allArticles && allArticles.length > 0 ? (
                        allArticles && allArticles.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                            <Card style={{ width: '100%' }} className="h-100">
                                {item.url_to_image && <Card.Img 
                                    variant="top" 
                                    src={item.url_to_image || "https://via.placeholder.com/150"}
                                    alt={item.title || "Article Image"} 
                                    className="img-fluid"
                                />}
                                <Card.Body className="p-3">
                                    <Card.Title>
                                        <a
                                            href={item.url || item.webUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-dark text-decoration-none"
                                        >
                                            {item.title || item.webTitle}
                                        </a>
                                    </Card.Title>
                                    <Card.Text className={styles.descriptionText}>
                                        {item.description || "No description available."}
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">
                                            {new Date(item.published_at || item.webPublicationDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </small>
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">
                                            {item.source_name || item.sectionName }
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))):(
                        <div className="text-center w-100 text-light">
                            <h4>No saved articles or news</h4>
                        </div>
                    )}
                    </Row>
                </Stack>
            </Container>
            
        </>
      )
}

export default SavedArticles;
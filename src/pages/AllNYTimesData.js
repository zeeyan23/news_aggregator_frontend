import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Container, Stack, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import styles from '../pages/newspages.module.css';
import axios from "axios";
import { mainURL } from "../Utils/urlis";
import { saveToReadLater } from "../components/saveToReadLater";
function AllNYTimesData(){
    const location = useLocation();
    const { remainingItems } = location.state || { remainingItems: [] };

    const [searchTerm, setSearchTerm] = useState('');
 const [readLaterItems, setReadLaterItems] = useState('');
  const userId = window.localStorage.getItem("id");
  const [isBookMarked,setBookMarked]=useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedNews, setSavedNews] = useState([]);
    // Filter items based on the search term
    const filteredItems = remainingItems.filter(
        (item) =>
            item.subsection?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.published_date?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        const fetchSavedNews = async () => {
          try {
            const response = await axios.get(`${mainURL}/api/getSavedReadLater`,{
              params:{user_id:userId}
            });
            setSavedNews(response.data); // Set saved news in state
          } catch (error) {
            console.error("Error fetching saved news:", error);
          }
        };
    
        fetchSavedNews();
      }, []);
    
      const isNewsSaved = (newsId, newsType) => {
        return savedNews.some(
          (savedItem) =>
            savedItem.news_id === newsId && savedItem.news_type === newsType
        );
      };

    const handleReadLater = async (item) => {
        const news_type= item.source_name ? "news" : (item.sectionName ? "guardian_news" : item.subsection ? "nytimes_news": "") 
        
        const result = await saveToReadLater(userId, item.id, news_type);
        setIsLoading(true);
        if (result.success) {
          setReadLaterItems(item);
          alert(result.message);
          setSavedNews((prev) => [...prev, { news_id: item.id, news_type: news_type }]);
          setIsLoading(false);
        } else {
          alert(result.message); 
        }
      };

    return(
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
                                    src={item.imageUrl || "https://via.placeholder.com/150"}
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
                                    <Container>
                                        <Row>
                                            <Col>
                                            <Card.Text className="d-flex align-items-center">
                                                <small className="text-muted">
                                                {new Date(item.published_date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                                </small>
                                            </Card.Text>
                                            </Col>
                                            <Col xs={1} className='pb-1'>
                                            <Card.Text className="d-flex align-items-center">
                                                <Button
                                                variant="link"
                                                className="p-0 me-2 text-dark"
                                                title="Read Later"
                                                onClick={() => handleReadLater(item)}
                                                >
                                                {isNewsSaved(item.id, item.source_name ? "news" : (item.sectionName ? "guardian_news" : item.subsection ? "nytimes_news": "") 
                                                ) ? <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                                                    </svg>
                                                </p>: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                                </svg>}
                                                </Button>
                                                {isLoading && <Spinner animation="border" />}
                                            </Card.Text>
                                            </Col>
                                        </Row>
                                        </Container>
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
    )
}

export default AllNYTimesData;
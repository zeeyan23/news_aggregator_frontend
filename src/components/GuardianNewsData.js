import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './techdatacards.module.css';
import { saveToReadLater } from './saveToReadLater';

const GuardianNewsData = ({ data }) =>{
    const navigate = useNavigate();
    const userId = window.localStorage.getItem("id");
    const [isLoading, setIsLoading] = useState(false);
    const [savedNews, setSavedNews] = useState([]);
    const [readLaterItems, setReadLaterItems] = useState('');
  const handleLoadMore = () => {
    navigate("/all_guardian_news", { state: { remainingItems: data.slice(4) } });
  };


  const featuredItem = data.slice(0, 4);
  const remainingItems = data.slice(4);

 
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

    const isNewsSaved = (newsId, newsType) => {
        return savedNews.some(
          (savedItem) =>
            savedItem.news_id === newsId && savedItem.news_type === newsType
        );
      };
  return (
    <Container>
        <h2 className="mt-4 mb-4 text-light">US and UK Political Events</h2>
        <Row className="gx-4 gy-4">
            {featuredItem.map((item, index) => (
                <Col 
                    key={index} 
                    xs={12}  
                    sm={6}   
                    md={6}   
                    lg={6}  
                    className="d-flex"
                >
                    <Card className={`border-0 ${styles.card} w-100`}>
                        <Card.Body className={styles.cardBody}>
                            <Card.Title>
                                <a
                                    href={item.webUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark text-decoration-none"
                                >
                                    {item.webTitle || "Untitled"}
                                </a>
                            </Card.Title>
                            <Card.Text>
                                {item.content || "No description available."}
                            </Card.Text>
                            <Container>
                                <Row>
                                  <Col>
                                    <Card.Text className="d-flex align-items-center">
                                      <small className="text-muted">
                                        {new Date(item.webPublicationDate).toLocaleDateString("en-US", {
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
                                    </Card.Text>
                                  </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        {remainingItems.length > 0 && (
            <div className="text-center my-4">
                <button onClick={handleLoadMore} className="btn btn-primary">
                    Load More
                </button>
            </div>
        )}
    </Container>


  );
}

export default GuardianNewsData;
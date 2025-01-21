import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './articlecards.module.css';
import { saveToReadLater } from './saveToReadLater';
import axios from 'axios';
import { mainURL } from '../Utils/urlis';

const ArticleCards = ({ data }) => {
  const navigate = useNavigate();
  const [readLaterItems, setReadLaterItems] = useState('');
  const userId = window.localStorage.getItem("id");
  const [isBookMarked,setBookMarked]=useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [savedNews, setSavedNews] = useState([]);

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

  const handleLoadMore = () => {
    navigate("/all_headlines", { state: { remainingItems: data.slice(7) } });
  };

  const featuredItem = data[0];
  const leftItems = data.slice(1, 4); 
  const rightItems = data.slice(4, 7);
  const remainingItems = data.slice(7);

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

  return (
    <Container className='pt-5'>
      <h2 className="mt-4 mb-4 text-light">Top Headlines</h2>
      <Row className={styles.rowContainer}>
        {/* Left Column */}
        <Col className="mb-3">
          {leftItems.map((item, index) => (
            <Card key={index} className="mb-3 border-0">
              <Row className="g-0">
                <Col xs={5}>
                  <Card.Img
                    src={item.url_to_image || "https://via.placeholder.com/150"}
                    alt={item.title || "Article Image"}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Col>
                <Col>
                  <Card.Body className="p-2">
                    <Card.Title className="fs-6">
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
                      {item.description || "No description available."}
                    </Card.Text>
                    <Container>
                      <Row>
                        <Col>
                          <Card.Text className="d-flex align-items-center">
                            <small className="text-muted">
                              {new Date(item.published_at).toLocaleDateString("en-US", {
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
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        
        <Col  className="mb-3">
          {featuredItem && (
            <Card className="mb-4 border-0">
              <Card.Img
                variant="top"
                src={featuredItem.url_to_image || "https://via.placeholder.com/300x150"}
                alt={featuredItem.title || "Featured Image"}
              />
              <Card.Body>
                <Card.Title className="fs-4">
                  <a
                    href={featuredItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark text-decoration-none"
                  >
                    {featuredItem.title || "Untitled"}
                  </a>
                </Card.Title>
                <Card.Text>
                  {featuredItem.content || "No description available."}
                </Card.Text>
            
                <Container>
                  <Row>
                    <Col>
                      <Card.Text className="d-flex align-items-center">
                        <small className="text-muted">
                          {new Date(featuredItem.published_at).toLocaleDateString("en-US", {
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
                          onClick={() => handleReadLater(featuredItem)}
                        >
                          {isNewsSaved(featuredItem.id, featuredItem.source_name ? "news" : (featuredItem.sectionName ? "guardian_news" : featuredItem.subsection ? "nytimes_news": "") 
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
          )}
        </Col>

        {/* Right Column */}
        <Col className="mb-3">
          {rightItems.map((item, index) => (
            <Card key={index} className="mb-3 border-0">
            <Row className="g-0">
              <Col xs={5}>
                <Card.Img
                  src={item.url_to_image || "https://via.placeholder.com/150"}
                  alt={item.title || "Article Image"}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </Col>
              <Col>
                <Card.Body className="p-2">
                  <Card.Title className="fs-6">
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
                      {item.description || "No description available."}
                    </Card.Text>
                  <Container>
                      <Row>
                        <Col>
                          <Card.Text className="d-flex align-items-center">
                            <small className="text-muted">
                              {new Date(item.published_at).toLocaleDateString("en-US", {
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
              </Col>
            </Row>
            </Card>
          ))}
        </Col>
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
};

export default ArticleCards;

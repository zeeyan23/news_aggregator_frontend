import { useEffect, useState } from "react";
import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../components/techdatacards.module.css';
import personalizedStyles from '../pages/personalized.module.css';
import axios from "axios";
import { mainURL } from "../Utils/urlis";
import NavigationBar from "../components/NavigationBar";
function PersonalizedPage(){

    const [allNews, setAllNews]=useState({
        news: [],
        guardian: [],
        nytimes: [],
      });
      
      const [selectedSource, setSelectedSource] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("");
      const [selectedAuthor, setSelectedAuthor] = useState("")

    const [sources, setSources] = useState([])
    const [category, setCateogory] = useState([])
    const [authorsname, setAuthorsName] = useState([])

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetchAllNews();
        fetchSources();
        fetchCategory();
        fetchAuthors();
    },[])

    const fetchAllNews= async()=>{
        setLoading(true);
        try {
          const response = await axios.get(
            `${mainURL}/api/fetchAllNews`, 
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          const { news, guardian, nytimes } = response.data;
            // Combine the news data into one array of objects
            const combinedNewsData = [
            ...news.map(item => ({ ...item, source: 'news' })),
            ...guardian.map(item => ({ ...item, source: 'guardian' })),
            ...nytimes.map(item => ({ ...item, source: 'nytimes' })),
            ];

            setAllNews(response.data);
            setLoading(false)
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

    const fetchSources= async()=>{
        try {
            axios.get(`${mainURL}/api/sources`)
            .then(response => {
                if (response.data.status === 'success') {
                    setSources(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching sources:', error);
            });
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

    const fetchCategory= async()=>{
        try {
            axios.get(`${mainURL}/api/category`)
            .then(response => {
                if (response.data.status === 'success') {
                    setCateogory(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching sources:', error);
            });
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

    const fetchAuthors= async()=>{
        try {
            axios.get(`${mainURL}/api/authors`)
            .then(response => {
                if (response.data.status === 'success') {
                    setAuthorsName(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching sources:', error);
            });
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

      const handleSourceChange = async (selectedSource) => {
        setSelectedSource(selectedSource);
        setLoading(true);
        
        try {
          // Make the API call based on the selected source
          const response = await axios.get(`${mainURL}/api/filter-news`, {
            params: { source: selectedSource },
          });
      
            if (response.data.guardian) {
                setAllNews((prevState) => ({
                    guardian: response.data.guardian,
                  }));
                  setLoading(false);
            } else if (response.data.nytimes) {
                setAllNews((prevState) => ({
                    nytimes: response.data.nytimes,
                  }));
                  setLoading(false);
            }else if(response.data.news){
                setAllNews((prevState) => ({
                    news: response.data.news,
                  }));
                  setLoading(false);
            }
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const handleCategoryChange = async (selectedCategory) => {
        setSelectedCategory(selectedCategory);
        setLoading(true)
        try {
          // Make the API call based on the selected Category
          const response = await axios.get(`${mainURL}/api/filter_news_by_category`, {
            params: { category: selectedCategory },
          });
      
            if (response.data.guardian) {
                setAllNews((prevState) => ({
                    guardian: response.data.guardian,
                  }));
                  setLoading(false);
            } else if (response.data.nytimes) {
                setAllNews((prevState) => ({
                    nytimes: response.data.nytimes,
                  }));
                  setLoading(false);
            }
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };


      const handleAuthorChange = async (selectedAuthor) => {
        setSelectedAuthor(selectedAuthor);
        setLoading(true)
        try {
          // Make the API call based on the selected Author
          const response = await axios.get(`${mainURL}/api/filter_news_by_author`, {
            params: { author: selectedAuthor },
          });
      
            if (response.data.news) {
                setAllNews((prevState) => ({
                    news: response.data.news,
                  }));
                  setLoading(false);
            } else if (response.data.nytimes) {
                setAllNews((prevState) => ({
                    nytimes: response.data.nytimes,
                  }));
                  setLoading(false);
            }
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      const handleReset = () => {
        setSelectedSource("");
    setSelectedCategory("");
    setSelectedAuthor("");
        fetchAllNews(); 
      };
    
    //   useEffect(() => {
    //     if (allNews.length) {
    //       setLoading(false);
    //     }
    //   }, [allNews]);

    return(
        <>
            <NavigationBar />
            
                <>
                    <Stack className={personalizedStyles.wrap}>
                        <Container>
                            <Row g className='flex-column flex-sm-row g-3'>
                                <Col>
                                    <Form.Select  aria-label="Select source"  value={selectedSource}
                                        onChange={(e) => handleSourceChange(e.target.value)}>
                                        <option>Select source</option>
                                        {sources.map((source, index) => (
                                            <option key={index} value={source.source_name}>
                                                {source.source_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select aria-label="Select category"  value={selectedCategory}
                                        onChange={(e) => handleCategoryChange(e.target.value)}>
                                        <option>Select category</option>
                                        {category.map((source, index) => (
                                            <option key={index} value={source.category}>
                                                {source.category}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select aria-label="Select author" value={selectedAuthor}
                                        onChange={(e) => handleAuthorChange(e.target.value)}>
                                        <option>Select authors</option>
                                        {authorsname.map((source, index) => (
                                            <option key={index} value={source.authorName}>
                                                {source.authorName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <button onClick={handleReset} style={{ marginLeft: "10px" }}>
                                        Reset
                                    </button>
                                </Col>
                                
                            </Row>
                        </Container>
                    </Stack>
                    {loading ? (
                        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Row>
                            <Col className="text-center">
                            <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                        </Container>
                    ) : (
                    <Container className={personalizedStyles.listContainer}>
                    <Stack direction="horizontal" className="w-100">
                        <Row className="g-3">
                                <>
                                    {allNews.news && allNews.news.map((item, index) => (
                                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                                            <Card style={{ width: '100%' }} className="h-100">
                                                <Card.Img 
                                                    variant="top" 
                                                    src={item.url_to_image || "https://via.placeholder.com/150"}
                                                    alt={item.title || "Article Image"} 
                                                    className="img-fluid"
                                                />
                                                <Card.Body className="p-3">
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
                                                        {item.description || "No description available."}
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
                                                            {item.source_name || ""}
                                                        </small>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}

                                    {allNews.guardian && allNews.guardian.map((item, index) => (
                                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                                            <Card style={{ width: '100%' }} className="h-100">
                                                <Card.Body className="p-3"> 
                                                    <Card.Title>
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-dark text-decoration-none"
                                                        >
                                                            {item.webTitle || "Untitled"}
                                                        </a>
                                                    </Card.Title>
                                                    <Card.Text className={styles.descriptionText}>
                                                        {item.content || "No description available."}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {new Date(item.webPublicationDate).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </small>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {item.sectionName || ""}
                                                        </small>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {item.type || ""}
                                                        </small>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}

                                    {allNews.nytimes && allNews.nytimes.map((item, index) => (
                                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                                            <Card style={{ width: '100%' }} className="h-100">
                                                <Card.Img 
                                                    variant="top" 
                                                    src={item.imageUrl || "https://via.placeholder.com/150"}
                                                    alt={item.title || "Article Image"} 
                                                    className="img-fluid"
                                                />
                                                <Card.Body className="p-3"> 
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
                                                            {new Date(item.published_date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </small>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {item.section || ""}
                                                        </small>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {item.item_type || ""}
                                                        </small>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">
                                                            {item.byline || ""}
                                                        </small>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </>
                        </Row>
                    </Stack>
                    </Container>
                     )} 
                </>
             
       </>
    )
}

export default PersonalizedPage;
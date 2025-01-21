import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import axios, { Axios } from 'axios';
import { API_KEY, mainURL } from "../Utils/urlis";
import ArticleCards from "../components/ArticleCards";
import TechDataCards from "../components/TechDataCards";
import GuardianNewsData from "../components/GuardianNewsData";
import NYTData from "../components/NYTData";

function Dashboard(){

  const [data, setData]=useState([]);
  const [techCrunchTheNextWeb, settechCrunchTheNextWeb]=useState([]);
  const [guardianNewsData, setguardianNewsData]=useState([]);
  const [nYTimesNewsData, setNYTimesNewsData]=useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchNews();
    fetchGuardianNews();
    fetchNYTNews();
  },[])

  const fetchNews= async()=>{
    try {
      const response = await axios.get(
        `${mainURL}/api/fetch_data`, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      setData(response.data.bbcNews);
      settechCrunchTheNextWeb(response.data.techCrunchAndNextWeb);

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

  const fetchGuardianNews= async()=>{
    try {
      const response = await axios.get(
        `${mainURL}/api/fetch_guardian_data`, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      setguardianNewsData(response.data);

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

  const fetchNYTNews= async()=>{
    try {
      const response = await axios.get(
        `${mainURL}/api/fetch_nytimes_data`, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      setNYTimesNewsData(response.data);

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

  useEffect(() => {
    if (data.length && techCrunchTheNextWeb.length && guardianNewsData.length && nYTimesNewsData.length) {
      setLoading(false); // Set loading to false when all data is fetched
    }
  }, [data, techCrunchTheNextWeb, guardianNewsData, nYTimesNewsData]);

  return(
    <>
      <NavigationBar />
      {loading ? (
         <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Row>
            <Col className="text-center">
              <Spinner animation="border" variant="light" />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <ArticleCards data={data} />
          <TechDataCards data={techCrunchTheNextWeb} />
          <GuardianNewsData data={guardianNewsData} />
          <NYTData data={nYTimesNewsData} />
        </>
      )}
    </>
  )
}

export default Dashboard;
import { Route, Router, Routes, useLocation } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import AllHeadlines from "./pages/AllHeadlines"
import AllNYTimesData from "./pages/AllNYTimesData"
import AllTechCrunchData from "./pages/AllTechCrunchData"
import AllGuardianData from "./pages/AllGuardianData"
import PersonalizedPage from "./pages/PersonalizedPage"
import SavedArticles from "./pages/SavedArticles"
import { useEffect } from "react"
 

function App() {

  const location = useLocation();

  // Map routes to tab titles
  const routeTitles = {
    '/': 'Sign In ',
    '/signup': 'Sign Up ',
    '/dashboard': 'Dashboard ',
    '/personalized/news_feed/': 'Personalized News Feed ',
    '/all_headlines': 'All Headlines ',
    '/all_newyork_times_news': 'NY Times News ',
    '/all_techcrunch_news': 'TechCrunch News ',
    '/all_guardian_news': 'Guardian News ',
    '/saved_articles': 'Saved Articles ',
  };

  // Change document title on route change
  useEffect(() => {
    const currentTitle = routeTitles[location.pathname] || 'My App';
    document.title = currentTitle;
  }, [location]);

  return (
    <Routes>
      <Route path="/"element={<SignIn />}/>
      <Route path="/signup"element={<SignUp />}/>
      <Route path="/dashboard"element={<Dashboard />}/>
      <Route path="/personalized/news_feed/" element={<PersonalizedPage />} />
      <Route path="/all_headlines" element={<AllHeadlines />} />
      <Route path="/all_newyork_times_news" element={<AllNYTimesData />} />
      <Route path="/all_techcrunch_news" element={<AllTechCrunchData />} />
      <Route path="/all_guardian_news" element={<AllGuardianData />} />
      <Route path="/saved_articles" element={<SavedArticles />} />
    </Routes>
  )
}

export default App

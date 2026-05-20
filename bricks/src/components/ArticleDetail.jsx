import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        const res = await axios.get('https://bricks-keys.vercel.app/api/articles');
        
        const foundArticle = res.data.find(item => item.id === parseInt(id));
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          console.error("Article not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container text-center my-5">
        <h2>Article Not Found</h2>
        <button className="btn btn-success mt-3" onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    );
  }

  return (
    <div className="article-detail-page" style={{ paddingTop: '100px', backgroundColor: '#fff' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex align-items-center gap-2 mb-4">
              <button 
                onClick={() => navigate(-1)} 
                className="btn btn-link text-decoration-none text-dark p-0"
              >
                <i className="bi bi-arrow-left me-1"></i> Back
              </button>
              <span className="text-muted">|</span>
              <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                {article.category || 'Real Estate'}
              </span>
              <span className="text-muted ms-auto">{article.date}</span>
            </div>
            <h1 className="display-4 fw-bold mb-4" style={{ color: '#1a3c34', lineHeight: '1.2' }}>
              {article.title}
            </h1>

            <div className="rounded-4 overflow-hidden mb-5 shadow-sm">
              <img 
                src={article.image_url || article.image} 
                alt={article.title} 
                className="img-fluid w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="article-body" style={{ color: '#444', lineHeight: '1.9', fontSize: '1.15rem' }}>
                  <p className="fw-bold text-dark mb-4" style={{ fontSize: '1.3rem' }}>
                    {article.intro}
                  </p>
                  
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {article.content}
                  </div>
                  {article.highlights && (
                    <div className="bg-light p-4 rounded-4 my-5 border-start border-success border-4">
                      <h4 className="fw-bold mb-3 text-dark">Key Highlights:</h4>
                      <ul className="mb-0">
                        {typeof article.highlights === 'string' 
                          ? article.highlights.split(',').map((item, idx) => <li key={idx} className="mb-2">{item}</li>)
                          : article.highlights.map((item, idx) => <li key={idx} className="mb-2">{item}</li>)
                        }
                      </ul>
                    </div>
                  )}

                  <p className="mt-5">
                    Stay tuned for more updates as we continue to track these developments across the country. 
                    Our team of experts is dedicated to bringing you the most accurate real estate data.
                  </p>
                </div>
                
                <hr className="my-5" />
                
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="fw-bold">Share this article:</div>
                  <div className="d-flex gap-3 fs-5 text-success">
                     <i className="bi bi-facebook cursor-pointer hover-opacity"></i>
                     <i className="bi bi-twitter cursor-pointer hover-opacity"></i>
                     <i className="bi bi-linkedin cursor-pointer hover-opacity"></i>
                     <i className="bi bi-link-45deg cursor-pointer hover-opacity"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
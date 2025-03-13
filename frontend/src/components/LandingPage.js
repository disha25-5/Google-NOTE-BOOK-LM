import React from 'react';
import './LandingPage.css'; // Create this file

function LandingPage({ onTryClick }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">NotebookLM</div>
        <nav className="landing-nav">
          <a href="https://notebooklm.google/">Overview</a>
          <a href="https://notebooklm.google/">NotebookLM Plus</a>
        </nav>
      </header>
      <section className="hero">
         <h1>
         Think <span className="smarter  gradient-text">Smarter</span>, <br />
           Not Harder
         </h1>
         <p>
           The ultimate tool for understanding the information that matters most
           to you,<br />
           built with Gemini 2.0.
         </p>
         <button className="try-button" onClick={onTryClick}>Try NotebookLM</button>
       </section>
      <section className="hero-here">
        <h1>Your Personalized AI Research Assistant</h1>
    </section>

      <section className="Upload-section">
        <div className="content-container">
          <div className="text-content">
            <h2>Upload your sources</h2>
            <p>
              Upload PDFs, websites, YouTube videos, audio files, Google Docs, or
              Google Slides, and NotebookLM will summarize them and make interesting
              connections between topics, all powered by Gemini 2.0's multimodal
              understanding capabilities.
            </p>
          </div>
          <div className="video-placeholder">
          <video controls autoPlay muted width="600" height="340">
  <source src="/videos/upload_your_sources.mp4" type="video/mp4" />
 
</video>

 </div>
        </div>
      </section>
      

      <section className="instant-insights-section">
        <div className="content-container">
          <div className="text-content">
            <h2>Instant insights</h2>
            <p>
              With all of your sources in place, NotebookLM gets to work and becomes
               a personalized AI expert in the information that matters most to you.
            </p>
          </div>
          <div className="video-placeholder">
        
          <video controls autoPlay muted width="600" height="340">
  <source src="/videos/instant_insights.mp4" type="video/mp4" />
 
</video>
        
        </div>
        </div>
      </section>

      <section className="see-the-source-section">
        <div className="content-container">
          <div className="text-content">
            <h2>See the source, not just the answer</h2>
            <p>
              Gain confidence in every response because NotebookLM provides clear
              citations for its work, showing you the exact quotes from your sources.
            </p>
          </div>
          <div className="video-placeholder">
          <video controls autoPlay muted width="600" height="340">
  <source src="/videos/see_the_source_not_just_the_answer.mp4" type="video/mp4" />
 
</video>

 </div>
        </div>
      </section>

      <section className="listen-and-learn-section">
        <div className="content-container">
          <div className="text-content">
            <h2>Listen and learn on the go</h2>
            <p>
              Our new Audio Overview feature can turn your sources into engaging "Deep
              Dive" discussions with one click.
            </p>
          </div>
          <div className="video-placeholder">
          <video controls autoPlay muted width="600" height="340">
  <source src="/videos/listen_and_learn_on_the_go.mp4" type="video/mp4" />
 
</video>

 </div>
        </div>
      </section>

      <section className="privacy-section">
        <h2>We value your privacy and do not use your personal<br /> data to train NotebookLM.</h2>
        <p>NotebookLM does not use your personal data, including your source uploads, queries, and the responses from the model for training.</p>
     
      </section>

      <section className="how-people-section">
        <h2>How people are using NotebookLM</h2>
        <div className="how-people-cards">
          <div className="how-people-card">
            <h3>Power study</h3>
            <p>
              Upload lecture recordings, textbook chapters, and research papers. Ask
              NotebookLM to explain complex concepts in simple terms, provide real-world
              examples, and reinforce your understanding.
            </p>
            <p>Learn faster and deeper.</p>
          </div>
          <div className="how-people-card">
            <h3>Organize your thinking</h3>
            <p>
              Upload your source material and let NotebookLM create a polished presentation
              outline, complete with key talking points and supporting evidence.
            </p>
            <p>Present with confidence.</p>
          </div>
          <div className="how-people-card">
            <h3>Spark new ideas</h3>
            <p>
              Upload brainstorming notes, market research, and competitor research. Ask
              NotebookLM to identify trends, generate new product ideas, and uncover hidden
              opportunities.
            </p>
            <p>Unlock your creative potential.</p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <div className="google-logo"><a href="https://www.google.com/">Google</a></div>
        <nav className="footer-nav">
          <a href="https://notebooklm.google/">Privacy</a>
          <a href="https://notebooklm.google/">Terms</a>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
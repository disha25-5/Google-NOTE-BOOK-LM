
// import React, { useState } from 'react';
// import LandingPage from './components/LandingPage';
// import MainApp from './components/MainApp';

// function App() {
//   const [showMainApp, setShowMainApp] = useState(false);

//   const handleTryClick = () => {
//     setShowMainApp(true);
//   };

//   return (
//     <div>
//       {showMainApp ? (
//         <MainApp />
//       ) : (
//         <LandingPage onTryClick={handleTryClick} />
//       )}
//     </div>
//   );
// }

// export default App;
///////////////second//////////
// import React, { useState, useRef } from 'react';
// import LandingPage from './components/LandingPage';
// import MainApp from './components/MainApp';

// function App() {
//   const [showMainApp, setShowMainApp] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);

//   const mainAppRef = useRef(null); // Ref for MainApp

//   const handleTryClick = () => {
//     setShowMainApp(true);
//   };

//   const handleUpload = (url) => {
//     setPdfUrl(url);
//   };

//   const goToPage = (page) => {
//     // Access MainApp's goToPage function through the ref
//     mainAppRef.current.goToPage(page);
//   };

//   return (
//     <div>
//       {showMainApp ? (
//         <MainApp
//           pdfUrl={pdfUrl}
//           setPdfUrl={setPdfUrl}
//           goToPage={goToPage}
//           ref={mainAppRef} // Pass the ref to MainApp
//           handleUpload={handleUpload} // Pass the upload handler to MainApp
//         />
//       ) : (
//         <LandingPage onTryClick={handleTryClick} />
//       )}
//     </div>
//   );
// }

// export default App;
/////////third//
import React, { useState, useRef } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const mainAppRef = useRef(null); // Ref for MainApp

  const handleTryClick = () => {
    setShowMainApp(true);
  };

  const goToPage = (page) => {
    // Access MainApp's goToPage function through the ref
    mainAppRef.current.goToPage(page);
  };

  return (
    <div>
      {showMainApp ? (
        <MainApp
          pdfUrl={pdfUrl}
          setPdfUrl={setPdfUrl}
          goToPage={goToPage}
          ref={mainAppRef} // Pass the ref to MainApp
        />
      ) : (
        <LandingPage onTryClick={handleTryClick} />
      )}
    </div>
  );
}

export default App;
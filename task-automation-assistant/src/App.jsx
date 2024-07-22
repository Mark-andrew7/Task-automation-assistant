import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@forge/bridge';

const App = () => {
  const [eulaContent, setEulaContent] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    fetch('/EULA.txt')
      .then(response => response.text())
      .then(data => setEulaContent(data));
  }, []);

  const handleAgree = () => {
    setAgreed(true);
    // Proceed with app functionality
  };

  if (!agreed) {
    return (
      <Modal onClose={handleAgree} isOpen>
        <div style={{ padding: '20px' }}>
          <h1>End User License Agreement</h1>
          <pre style={{ maxHeight: '400px', overflowY: 'scroll', whiteSpace: 'pre-wrap' }}>{eulaContent}</pre>
          <Button text="I Agree" onClick={handleAgree} />
        </div>
      </Modal>
    );
  }

  return (
    <div>
      {/* Main app component */}
      <h1>Welcome to Task Automation Assistant</h1>
    </div>
  );
};

export default App;

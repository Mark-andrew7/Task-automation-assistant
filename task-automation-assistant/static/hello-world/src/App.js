import React, { useState } from 'react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [projectKey, setProjectKey] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueKey, setIssueKey] = useState('');
  const [fieldsToUpdate, setFieldsToUpdate] = useState('');
  const [transitionId, setTransitionId] = useState('');
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');
  const [slackMessage, setSlackMessage] = useState('');
  const [result, setResult] = useState(null);

  const createIssue = async () => {
    try {
      const response = await invoke('createJiraIssue', {
        projectKey,
        summary,
        description
      });
      setResult(response.body);
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const updateIssue = async () => {
    try {
      const response = await invoke('updateJiraIssue', {
        issueKey,
        fieldsToUpdate
      });
      setResult(response.body);
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const getTransitions = async () => {
    try {
      const response = await invoke('getIssueTransitions', {
        issueKey
      });
      setResult(response.body);
    } catch (error) {
      console.error('Error getting issue transitions:', error);
    }
  };

  const transitionIssue = async () => {
    try {
      const response = await invoke('transitionIssue', {
        issueKey,
        transitionId
      });
      setResult(response.body);
    } catch (error) {
      console.error('Error transitioning issue:', error);
    }
  };

  const sendSlackNotification = async () => {
    try {
      const response = await invoke('sendSlackNotification', {
        webhookUrl: slackWebhookUrl,
        message: slackMessage
      });
      setResult(response.body);
    } catch (error) {
      console.error('Error sending Slack notification:', error);
    }
  };

  return (
    <div>
      <h1>Task Automation Assistant</h1>
      <div>
        <h2>Create Jira Issue</h2>
        <input
          type="text"
          placeholder="Project Key"
          value={projectKey}
          onChange={(e) => setProjectKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createIssue}>Create Issue</button>
      </div>
      <div>
        <h2>Update Jira Issue</h2>
        <input
          type="text"
          placeholder="Issue Key"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fields to Update"
          value={fieldsToUpdate}
          onChange={(e) => setFieldsToUpdate(e.target.value)}
        />
        <button onClick={updateIssue}>Update Issue</button>
      </div>
      <div>
        <h2>Get Issue Transitions</h2>
        <input
          type="text"
          placeholder="Issue Key"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
        />
        <button onClick={getTransitions}>Get Transitions</button>
      </div>
      <div>
        <h2>Transition Issue</h2>
        <input
          type="text"
          placeholder="Issue Key"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transition ID"
          value={transitionId}
          onChange={(e) => setTransitionId(e.target.value)}
        />
        <button onClick={transitionIssue}>Transition Issue</button>
      </div>
      <div>
        <h2>Send Slack Notification</h2>
        <input
          type="text"
          placeholder="Slack Webhook URL"
          value={slackWebhookUrl}
          onChange={(e) => setSlackWebhookUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slack Message"
          value={slackMessage}
          onChange={(e) => setSlackMessage(e.target.value)}
        />
        <button onClick={sendSlackNotification}>Send Notification</button>
      </div>
      <div>
        <h2>Result</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default App;
// Import necessary Forge and Jira API modules
import { resolver as forgeResolver, webhook } from '@forge/resolver';
import { api, route } from '@forge/api';

// Create a new instance of Resolver for handling webhook events
const resolver = new forgeResolver();

/**
 * Example function to handle issue created events.
 * This is a simplified example that logs the event and creates a new issue.
 */
resolver.define('onIssueCreated', async ({ payload }) => {
  console.log('Issue created event received:', payload);

  // Example: Create a new issue based on the event. Extend this logic to use templates or smart values.
  const newIssueResponse = await api.asApp().requestJira(route`/rest/api/3/issue`, {
    method: 'POST',
    body: JSON.stringify({
      fields: {
        project: { key: "YOUR_PROJECT_KEY" },
        summary: "Automatically created issue",
        description: "This issue was created automatically in response to an event.",
        issueType: { name: "Task" }
      }
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!newIssueResponse.ok) {
    const errorMessage = await newIssueResponse.text();
    throw new Error(`Failed to create new issue: ${errorMessage}`);
  }

  // Further actions (e.g., updating fields, transitioning issues, sending notifications) would follow a similar pattern.
});

// Set up a webhook to listen for issue created events
webhook.on('jira:issue_created', resolver.get('onIssueCreated'));
    // Make an API call to create a new Jira issue
    const response = await api.asApp().requestJira(route`/rest/api/3/issue`, {
        method: 'POST',
        body: requestBody,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    // Handle non-OK responses by throwing an error
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create Jira issue: ${errorMessage}`);
    }

    // Parse the response to JSON and return issue creation details
    const issue = await response.json();
    return { body: `Issue created: ${issue.key}`};

/**
 * Example function to update an issue's fields based on a trigger.
 * This could be extended to listen for specific events and update accordingly.
 */
resolver.define('updateIssueFields', async (req) => {
    const { issueKey, fieldsToUpdate } = req.payload;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`, {
        method: 'PUT',
        body: JSON.stringify({ fields: fieldsToUpdate }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update issue ${issueKey}: ${errorMessage}`);
    }

    return { body: `Issue updated: ${issueKey}` };
});

/**
 * Function to transition an issue through the workflow.
 */
resolver.define('transitionIssue', async (req) => {
    const { issueKey, transitionId } = req.payload;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}/transitions`, {
        method: 'POST',
        body: JSON.stringify({
            transition: { id: transitionId }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to transition issue ${issueKey}: ${errorMessage}`);
    }

    return { body: `Issue transitioned: ${issueKey}` };
});

// Additional functions for sending notifications, handling other events, etc., would follow a similar pattern.

// Export the resolver handler to make it available for use
export const handler = resolver.getDefinitions();

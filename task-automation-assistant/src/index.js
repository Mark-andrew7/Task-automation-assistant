// Import necessary modules from @forge/api package
import Resolver from '@forge/resolver';
import { api, route } from '@forge/api';

// Create a new instance of Resolver for handling requests
const resolver = new Resolver();

/**
 * Defines a simple resolver function that returns a static text.
 * @param {object} req - The request object.
 * @returns {string} - A static text response.
 */
resolver.define('getText', (req) => {
    // Logging the request for debugging purposes. Consider removing in production.
    console.log(req);

    // Return a static response text
    return 'Hello world!';
});

/**
 * Defines a resolver function to create a Jira issue.
 * @param {object} req - The request object containing payload with projectKey, summary, and description.
 * @returns {Promise<object>} - A promise that resolves with the created issue details.
 */
resolver.define('createJiraIssue', async (req) => {
    // Destructure necessary fields from the request payload
    const { projectKey, summary, description } = req.payload;

    // Prepare the request body for creating a new Jira issue
    const requestBody = JSON.stringify({
        fields: {
            project: { key: projectKey },
            summary: summary,
            description: description,
            issueType: { name: "Task" } // Corrected to use "Task" as a string
        }
    });

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
    return { body: `Issue created: ${issue.key}` };
});

// Export the resolver handler to make it available for use
export const handler = resolver.getDefinitions();
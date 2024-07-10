import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
import fetch from 'node-fetch';

const resolver = new Resolver();

resolver.define('createJiraIssue', async (req) => {
    const {projectKey, summary, description} = req.payload;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue`, {
        method: 'POST',
        body: JSON.stringify({
            fields: {
                project: {key: projectKey},
                summary: summary,
                description: description,
                issueType: {name: Task}
            }
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Failed to create jira issue ${errorMessage}`)
    }

    const issue = await response.json()
    return {body: `Issue created: ${issue.key}`}
})

resolver.define('updateJiraIssue', async (req) => {
    const {issueKey, fieldToUpdate } = req.payload

    const response = await api.asApp().requestJira(route`/rest/api/3/${issueKey}`, {
        method: 'PUT',
        body: JSON.stringify({ fields: fieldsToUpdate }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }        
    }) 

    if (!response.ok) {
        const errrorMessage = await response.text()
        throw new error(`Failed to create new issue ${errorMessage}`)
    }

    return {body: `Issue updated ${issueKey}`};
})

// Get available transitions for an issue
resolver.define('getIssueTransitions', async (req) => {
    const {issueKey} = req.payload;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}/transitions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Failed to get issue transitions ${issueKey}`)
    }

    const transitions = await response.json();
    return transitions;
})


resolver.define('transitionIssue', async (req) => {
    const {issueKey, transitionId} = req.payload;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}/transitions`, {
        method: 'POST',
        body: JSON.stringify({
            transition: {id: transitionId}
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Failed to transition issue: ${errorMessage}`)
    }

    return {body: `Issue ${issueKey} transitioned successfully`}
})

resolver.define('sendSlackNotification', async (req) => {
    const {webhookUrl, message} = req.payload;

    const payload = {
        text: message
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(`Failed to send slack notification: ${errorMessage}`)
        }

        return {body: 'Slack notification sent successfully'}
    } catch (error) {
        throw new Error(`Failed to send slack notification: ${error.message}`)
    }
})

export const handler = resolver.getDefinitions();


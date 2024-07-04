import Resolver from '@forge/resolver';
import { api, route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello world!';
});

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

resolver.define('update-Jira-Issue', async (req) => {
    const {issueKey, fieldToUpdate } = req.payload

    const response = await api.asApp().requestJira(route`/rest/api/3/${issueKey}`, {
        method: 'PUT',
        body: JSON.stringify({ fields: fieldsToUpdate }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        
        
    }) 
})

export const handler = resolver.getDefinitions();


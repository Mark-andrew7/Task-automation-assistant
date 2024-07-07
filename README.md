# Task Automation Assistant

Task Automation Assistant is a Forge app designed to streamline repetitive tasks and enhance productivity within Jira and Confluence. This app automates the creation of templates for common project types, sets up standardized workflows, and automates routine updates and notifications.

## Features

- **Automated Task and Issue Creation**: Simplify task and issue management by automating their creation.
- **Pre-defined Workflow Templates**: Use standard workflows to ensure consistency and efficiency across projects.
- **Scheduled Reminders and Notifications**: Never miss a deadline with automated reminders and notifications.
- **Integration with Third-party Tools**: Seamlessly integrate with tools like Slack and Trello for better collaboration.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Atlassian Forge CLI
- A Jira or Confluence account

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/your-username/task-automation-assistant.git
cd task-automation-assistant
```

2. **Install dependencies:**

```sh
npm install
```

3. **Deploy the app:**

```sh
forge deploy
```

4. **Install the app in your Jira or Confluence instance:**

```sh
forge install
```

### Configuration

1. **Update the `manifest.yml` file:**

```yml
modules:
  jira:globalPage:
    - key: task-automation-assistant-hello-world-page
      resource: main
      resolver:
        function: resolver
      title: Forge app for Task Automation
  function:
    - key: resolver
      handler: index.handler
resources:
  - key: main
    path: static/hello-world/build
app:
  runtime:
    name: nodejs18.x
  id: ari:cloud:ecosystem::app/52609c4f-7a0b-45b4-86ec-77479e783864

permissions:
  scopes:
    - read:jira-work
    - write:jira-work
```

2. **Update the `static/hello-world/build` directory with your frontend code.**

### Usage

After installation, you can access the Task Automation Assistant from the global navigation in Jira or Confluence. Use the app to automate various tasks, create and manage templates, and receive notifications for important events.

## Development

### Running Locally

To run the app locally for development purposes:

1. **Start the development server:**

```sh
forge tunnel
```

2. **Make changes to your code and see them reflected in real-time.**

### Testing

To run tests for your app:

```sh
npm test
```

## Contributing

We welcome contributions to enhance the functionality of the Task Automation Assistant. Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions, please open an issue in the repository or contact us at support@example.com.


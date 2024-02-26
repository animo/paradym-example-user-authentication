# User authentication using credentials with Paradym

<p align="center">
  <br />
<img src="/assets/app-screenshot.png" alt=" Demo of the application that shows a QR code to login using a credential." width="960" />
</p>

> Check out the [YouTube video](https://www.youtube.com/watch?v=Hk7uXjI5yLg) for a complete walkthrough of the demo application and its workflows.

This demo uses [Paradym](https://paradym.id), a workflow builder for developers that provides the infrastructure you need to use verifiable credentials in your solution. If you don't have an account yet, you can start with our [quick start guide](https://docs.paradym.id/).

This demo also uses the [Paradym Wallet](https://docs.paradym.id/integrating-with-a-holder-wallet/paradym-wallet), an open-source companion app to the Paradym platform available on the [Apple App Store](https://apps.apple.com/nl/app/paradym-wallet/id6449846111?l=en) and [Google Play Store](https://play.google.com/store/apps/details?id=id.paradym.wallet).

## Prerequisites

### Setup your workflows

**Register the credential**

First, we need to register the credential template. In this template, we define the properties of the credential we want to issue in our application.

- Create a new workflow in Paradym and navigate to the Templates tab.
- Look for the 'Register Credential Template' workflow, and click on 'use template'.
- Publish and run the workflow with the following attributes:
  - Name: `Bank account credential`
  - Version: `1.0`
  - Attributes: (**Make sure to capitalize the first character!**)
    - `Name`
    - `Email`
- Open the result of the `createCredentialDefinition` action and copy the `credentialDefinitionId`. Save the value for later.

**User sign-up workflow**

Now that we have the required credential definition Id, we can set up the sign-up workflow.

- Start on the Paradym dashboard and create a new workflow.
- Copy the contents from the `sign-up-user.yaml` file from the [Paradym directory](/paradym).
- Replace the `<YOUR_CREDENTIAL_DEFINITION_ID>` value with the `credentialDefinitionId` value from the first workflow.
- Publish the workflow.

**User login workflow**

Great, we now have a way to sign up new users. The last workflow will handle the login requests for existing users.

- Start on the Paradym dashboard and create a new workflow.
- Copy the contents from the `login-user.yaml` file from the [Paradym directory](/paradym).
- Replace the `<YOUR_CREDENTIAL_DEFINITION_ID>` value with the `credentialDefinitionId` value from the first workflow.
- Publish the workflow.

#### Step 3: Set your Paradym Project ID

You can find your Paradym Project ID in the settings tab on the Paradym dashboard as described [here](https://docs.paradym.id/executing-a-workflow/api-execution#project-id).

#### Step 4: Create your Paradym API Key

You can generate your API key in the settings tab on the Paradym dashboard as described [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).

#### Step 5: Set the environment variables

The environment variables consist of your Paradym API Key, Paradym project ID, and the ID's of the workflows just created. Once you have created the workflows in the Paradym dashboard, you can copy the workflow ID's from Paradym and set them as environment variables.

```bash
cp .env.example .env
```

| Variable              | Description                                                                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PARADYM_API_KEY`     | This is the API key used to send request to Paradym. You can generate your API key in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).   |
| `PARADYM_PROJECT_ID`  | This is your Paradym project identifier. It can be located in the settings tab on the Paradym dashboard as described [here](https://docs.paradym.id/executing-a-workflow/api-execution#project-id).                           |
| `SIGN_UP_WORKFLOW_ID` | This is the ID of the issue course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id).  |
| `LOGIN_WORKFLOW_ID`   | This is the ID of the verify course credential workflow. Once you have created the workflow in Paradym you can copy the ID from the [executions tab](https://docs.paradym.id/executing-a-workflow/api-execution#workflow-id). |

## Running the demo

Make sure to install the dependencies:

```bash
# bun
bun install
```

Initiate the data storage

```bash
npm exec drizzle-kit push:sqlite
```

You can then run the development server:

```bash
# bun
bun run dev
```

Open [http://localhost:3000](http://localhost:3000/sign-up) with your browser to see the result.

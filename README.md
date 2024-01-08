# User authentication using credentials with Paradym

<p align="center">
  <br />
<img src="/assets/app-screenshot.png" alt=" Demo of the application that shows a QR code to login using a credential." width="960" />
</p>

> Check out the [YouTube video](#) for a complete walkthrough of the demo application and its workflows.

This demo uses [Paradym](https://paradym.id), a workflow builder for developers that provides the infrastructure you need to use verifiable credentials in your solution. If you don't have an account yet, you can start with our [quick start guide](https://docs.paradym.id/).

This demo also uses the [Paradym Wallet](https://docs.paradym.id/integrating-with-a-holder-wallet/paradym-wallet), an open-source companion app to the Paradym platform available on the [Apple App Store](https://apps.apple.com/nl/app/paradym-wallet/id6449846111?l=en) and [Google Play Store](https://play.google.com/store/apps/details?id=id.paradym.wallet).

## Prerequisites

### Setup your workflows

**Register the credential**

First, we need to register the credential template. In this template, we define the properties of the credential we want to issue in our application.

- Create a new workflow in Paradym and navigate to the Templates tab.
- Look for the 'Register Credential Template' workflow, and click on 'use template'.
- Publish the workflow
- Run the workflow with the following attributes:
  - Name: Bank account credential
  - Version: 1.0
  - attributes: Name, Email (**Capitalize the first character!**)
- Execute the workflow via the executions tab.
- Click on the execution to view the result of your workflow.
- Copy the `credentialDefinitionId` from the result and save the value for later.

**User sign-up workflow**

Now that we have the required credential definition Id, we can setup the sign-up workflow.

- Start on the Paradym dashboard and create a new workflow.
- Copy the contents from the `sign-up-user.yaml` file from the `paradym` directory.
- Replace the `<YOUR_CREDENTIAL_DEFINITION_ID>` value with the `credentialDefinitionId` value from the previous step.
- Publish the workflow.

**User login workflow**

Great, we now have a way to sign up new users. The last workflow will handle the login requests for existing users.

- Start on the Paradym dashboard and create a new workflow.
- Copy the contents from the `login-user.yaml` file from the `paradym` directory.
- Replace the `<YOUR_CREDENTIAL_DEFINITION_ID>` value with the `credentialDefinitionId` value from the previous step.
- Publish the workflow.

#### Step 3: Create your Paradym API Key

You can generate your API key in the settings tab on the Paradym dashboard as described in [here](https://docs.paradym.id/executing-a-workflow/api-execution#api-key).

#### Step 4: Set the environment variables

Navigate to the `nuxt.config.ts` and replace the values in the `runtimeConfig` with the values you have just created:

- PARADYM_API_KEY: The API key you created in the Paradym dashboard.
- SIGN_UP_WORKFLOW_ID: The ID of the sign up workflow.
- LOGIN_WORKFLOW_ID: The ID of the login workflow.

## Running the demo

Make sure to install the dependencies:

```bash
# bun
bun install
```

Database

```bash
npm exec drizzle-kit push:sqlite
```

You can then run the development server:

```bash
# bun
bun run dev
```

Open [http://localhost:3000](http://localhost:3000/sign-up) with your browser to see the result.

# Toast Integrations Diagnostic Tool

## Description
The Toast Integrations Diagnostic Tool is designed to help care teams troubleshoot third-party integrations, such as DoorDash, Uber Eats, and Grubhub. The tool provides a summary of API orders by dining option and links to Splunk searches for order errors and other transactions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/eebrowning/toast_diagnostic.git
   ```
2. Navigate to the project directory:
   ```bash
   cd next-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the application:
   ```bash
   npm run dev
   ```
2. Access the tool in your browser at `http://localhost:3000`.
3. Enter the `GUID` of the restaurant and fetch restaurant data.
4. Click the "Show/Hide Dining Options" button to toggle the display of API orders by dining option.

## Features
- **API Orders by Dining Option**: View the total count of recent orders across third-party providers like DoorDash, Uber Eats, and Grubhub.
- **Splunk Searches**: Access links to Splunk searches and documentation for troubleshooting third-party integrations.
- **Copy Function**: Copy restaurant information to clipboard for quick reference, including address and GUID.

## Configuration
Update the `.env.local.example` file in the root directory with the following environment variables:

```plaintext
clientId=your_client_id
clientSecret=your_client_secret
```
These credentials are required to authenticate API requests. After updating the file remove the `.example` extension.

## Contributors
This project was created by Ethan Browning, Gabriel Santos, and David Alvarez from the Care Integrations team. For more information contact davidalvarez@toasttab.com

Special thanks to Toast and #hackathon24, Jimi Radcliff, Lee Nicholson, and Jerry Berney.

## License
This project is proprietary and owned by Toast Inc. Unauthorized copying, distribution, or modification is prohibited.
# Store POS SaaS

## Description
Store POS SaaS is a cloud-based Point of Sale (POS) system designed for retail stores. It provides features such as inventory management, sales tracking, customer management, and reporting.

## Features
- Inventory Management
- Sales Tracking
- Customer Management
- Reporting and Analytics
- User Management

## Getting Started
### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/store-POS-SaaS.git
    ```
2. Navigate to the project directory:
    ```bash
    cd store-POS-SaaS
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
### Usage
1. Change name of the `env.example.txt` file to `.env` and fill in the required environment variables.
3. Run docker-compose to start the database:
    ```bash
    docker-compose up
    ```
4. Generate Prisma client:
    ```bash
    npx prisma generate && npx prisma db push
    ```
5. Seed the database:
    ```bash
    npm run seed
    ```
6. Start the development server:
    ```bash
    npm run dev
    ```
#### Credentials for testing
  - Email: test@test.com
  - Password: password
****
## Contributing
Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

### Interface Language

For all contributors, please note that the user interface must be in Spanish. This is important to maintain consistency and accessibility for our primary users.

Additionally, we plan to add support for internationalization (i18n) in the future, which will allow the application to be translated into multiple languages more easily.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues
If you find any issues, please report them [here](https://github.com/yourusername/store-POS-SaaS/issues).

## Acknowledgments
- Thanks to all contributors and open-source projects that helped in building this project.

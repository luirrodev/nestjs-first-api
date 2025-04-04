# NestJS First API

#### Description

A learning project for exploring NestJS framework fundamentals, including REST API development, database integration with TypeORM, migrations, and API documentation with Swagger. This project serves as a practice ground for understanding dependency injection, modular architecture, and backend development best practices in a TypeScript environment.

Follow these steps to set up and run the application in your local environment:

### 1. Clone the repository

```bash
git clone git@github.com:luirroDev/nestjs-first-api.git
cd nestjs-first-api
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root by copying the template:

```bash
cp .env.template .env
```

Then modify the values in the `.env` file according to your local configuration if needed.

### 4. Run database migrations

```bash
pnpm run migration:run
```

### 5. Start the application in development mode

```bash
pnpm run start:dev
```

The application will be available at: http://localhost:3000

### 6. Access API documentation

Once the application is running, you can access the Swagger documentation at:
http://localhost:3000/docs

## Author

- [@luirroDev](https://www.github.com/luirroDev)

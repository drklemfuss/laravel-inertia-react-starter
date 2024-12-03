# Integration Test Setup for PostgreSQL

This directory contains integration tests that depend on PostgreSQL-specific features like `jsonb`, `uuid`, and custom indexes.

## Best Practices

1. Run Integration Tests in CI/CD: Ensure integration tests are executed in CI/CD pipelines, where PostgreSQL is always available.

2. Fallback for Local Development: Provide clear instructions (in IntegrationSetup.md) for developers to run PostgreSQL locally or use Docker.

3. Limit Integration Tests:

-   Write integration tests only for PostgreSQL-specific behavior.
-   Use SQLite or general DBMS-agnostic tests for everything else.

## Prerequisites

1. Ensure you have a running PostgreSQL instance:

    - Install PostgreSQL locally, or
    - Start a PostgreSQL container using Docker:
        ```bash
        docker run --name postgres-test -e POSTGRES_USER=test_user -e POSTGRES_PASSWORD=test_password -e POSTGRES_DB=test_db -p 5432:5432 -d postgres:15
        ```

2. Update `.env.testing`:

    ```dotenv
    APP_ENV=testing
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=test_db
    DB_USERNAME=test_user
    DB_PASSWORD=test_password

    ```

3. Run migrations:

```bash
php artisan migrate --env=testing
```

4. Run Integration Tests:

```bash
php artisan test --testsuite="PostgreSQL Tests"
```

## Alternative Environment Setup (Automated)

Instead of manually modifying `.env.testing`, you can dynamically override environment variables in the test setup. Here's how:

1. **Programmatically Override Environment Variables**
   Use Laravel’s `config()` helper in a `beforeEach` hook to set PostgreSQL configuration for specific tests.

    ```php
    beforeEach(function () {
        config([
            'database.default' => 'pgsql',
            'database.connections.pgsql.host' => env('DB_HOST', '127.0.0.1'),
            'database.connections.pgsql.database' => env('DB_DATABASE', 'test_db'),
            'database.connections.pgsql.username' => env('DB_USERNAME', 'test_user'),
            'database.connections.pgsql.password' => env('DB_PASSWORD', 'test_password'),
        ]);
    });
    ```

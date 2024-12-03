<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/drklemfuss/inertia-react">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Laravel 11 Starter with Inertia.js and React</h3>

  <p align="center">
    A modern, full-stack starter project for Laravel 11, Inertia.js, and React 18, with powerful features and Docker support.
    <br />
    <a href="https://github.com/drklemfuss/inertia-react"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/drklemfuss/inertia-react">View Demo</a>
    ·
    <a href="https://github.com/drklemfuss/inertia-react/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/drklemfuss/inertia-react/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

## About The Project

This starter kit is designed to provide a robust foundation for developing modern web applications with **Laravel 11**, **Inertia.js**, and **React 18**. It eliminates the complexity of managing separate backend and frontend architectures, offering a unified development experience.

### Backend: Laravel 11

[![Laravel][Laravel-shield]][Laravel-url]

-   **Proven MVC Architecture:** Laravel’s Model-View-Controller (MVC) pattern is a gold standard for building scalable and maintainable applications.
-   **Built-in Authentication:** Includes Laravel Breeze for authentication with features like login, registration, password reset, and email verification.
-   **Scalability:** Laravel powers some of the world’s largest applications, making it a trusted framework for projects of any scale.
-   **Rich Ecosystem:** Tools like Eloquent ORM, queues, event broadcasting, and an expressive syntax allow for rapid development.

### Middleware: Inertia.js

[![InertiaJS][inertia-shield]][Inertia-url]

-   **Seamless Bridge:** Inertia.js connects the backend and frontend without requiring a separate API layer. It sends JSON responses directly from the backend and renders views on the frontend, significantly speeding up development.
-   **Simplifies Development:** Eliminates the need for REST or GraphQL APIs, allowing developers to focus on building features instead of managing API endpoints.
-   **Improves Developer Experience:** Inertia combines the best of server-side routing and modern JavaScript frameworks.

### Frontend: React 18 + ShadCN UI

[![React][react-shield]][React-url]
[![Vite][vite-shield]][Vite-url]
[![Shadcn][shadcn-shield]][Shadcn-url]
[![TailwindCSS][tailwind-shield]][Tailwind-url]

-   **React 18:** Leverage the latest features of React, including concurrent rendering, which improves performance and user experience.
-   **ShadCN UI & Radix Components:** Provides a beautiful, modern design system and prebuilt UI components that are customizable and accessible.
-   **TailwindCSS:** Simplifies styling with utility-first CSS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

-   **Authentication:** Laravel Breeze provides secure, built-in user authentication workflows.
-   **Role-Based Access Control:** Manage roles and permissions with Spatie Laravel-Permissions.
-   **Admin Panel:** Filament v3 for resource management, including CRUD operations, log viewing, and permission management.
-   **Example Models:** Includes `Tasks` (user-associated) and `Countries` (static data) to demonstrate Eloquent ORM.
-   **Dockerized Setup:** Preconfigured for consistent local development using Docker Compose.
-   **Modern UI:** Landing pages styled with ShadCN UI, featuring custom authentication pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## When To Use This Starter Project

### Ideal Use Cases

1. **Full-Stack Applications:** Projects that need a modern backend with a React-powered frontend.
2. **Scalable Solutions:** Applications expecting to grow in complexity or user base.
3. **Rapid Prototyping:** Developers seeking a robust starter kit with authentication and admin features prebuilt.
4. **Unified Development Experience:** Teams that prefer working without the complexity of separate API layers.

### When Not To Use

1. **Single-Language Projects:** If your project requires the same programming language for both backend and frontend (e.g., Node.js).
2. **Static Sites or SPAs:** Applications where Laravel’s backend is unnecessary, and a framework like Next.js or Remix is more suitable.
3. **API-First Architectures:** Projects prioritizing a decoupled backend that serves multiple clients (e.g., mobile apps, other frontends).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

-   Clone the repository.
-   Copy the example `.env` file and modify it as needed.
-   Run `php artisan key:generate` to create an application key.

### Installation

#### Running Locally

1. Install PHP 8.3 and Composer.
    ```sh
    composer install
    ```
2. Start Laravel’s development server.
    ```sh
    php artisan serve
    ```
3. Install Node.js 20+ and PNPM.
    ```sh
    pnpm install
    pnpm dev
    ```

#### Using Docker Compose

1. Install Docker and Docker Compose.
2. Build and start the containers.
    ```sh
    docker compose -f docker-compose.dev.yml up --build
    ```
3. Migrate and seed the database.
    ```sh
    docker exec -it dev-app1 bash
    php artisan migrate:fresh --seed
    ```
4. Access the site on `http://localhost:8088` (port configurable in the compose file).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

This project uses Pest (https://pestphp.com/) for testing, a modern PHP testing framework that offers a simple and expressive syntax. The test suite is designed to ensure the application logic is robust and adheres to the defined policies and behaviors. Feature and unit tests are organized to cover critical functionalities, including role-based access control (RBAC)/permissions, CRUD operations (Resources) and User Management. .

To run the tests, ensure your local development environment is set up and all dependencies are installed. Then, execute the following command:

```bash
php artisan test
```

This command will automatically discover and run all tests in the tests directory, displaying the results in a clean and readable format. If you want to run a specific test file, you can provide the path to the file:

```bash
php artisan test tests/Feature/RBAC/TaskPolicyTest.php
```

For additional configuration options or advanced usage, refer to the Pest documentation (https://pestphp.com/docs/).

## Roadmap

-   [ ] Add support for notifications and queuing via Laravel Echo.
-   [ ] Integrate Supervisord for process management in Docker (Queues/Reverb server for websocket connections).
-   [ ] Upgrade to React 19 upon stable release.
-   [ ] Extend dashboard functionality with generic features.
-   [ ] Add SAAS-related functionality in separate branches.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are welcome! Fork the project and create a pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

-   Special thanks to Leo Mirando for UI inspirations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Laravel-shield]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[inertia-shield]: https://img.shields.io/badge/Inertia_JS-9553E9?style=for-the-badge&logo=Inertia&logoColor=white
[Inertia-url]: https://inertiajs.com
[shadcn-shield]: https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white
[Shadcn-url]: (https://ui.shadcn.com/)
[tailwind-shield]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Vite-url]: https://vite.dev/

# forum-clean-ddd-project

A forum project implemented with Clean Architecture and Domain-Driven Design (DDD), developed in TypeScript.

## About the Project

This project was initially created to study and apply the principles of Clean Architecture and Domain-Driven Design (DDD), providing a clear modular structure that separates domain, application, infrastructure, and tests. The main focus was to build a solid foundation for developing systems with decoupled business rules, maintainability, and testability.

After this learning phase, the structure and concepts developed here were successfully reused in the [`nest-project`](https://github.com/juliomchado/nest-project), demonstrating how good architecture early on facilitates evolution, code reuse, and accelerates development in future projects.

## Key Features

- Modular structure based on DDD: domain, application, infrastructure, and tests separated
- Application of Clean Architecture principles
- Domain encapsulates business rules without framework dependencies
- Organized code to ease maintenance and extension
- Base project for architectural studies and experiments

## Project Structure

- `src/` — main source code
  - Domain (entities, aggregates, value objects, domain services)
  - Use cases / application layer
  - Infrastructure (persistence, repositories, external services)
- `test/` — automated tests

## How to Run the Project

1. Clone the repository:
git clone https://github.com/juliomchado/forum-clean-ddd-project.git

3. Install dependencies:
npm install

5. Configure environment variables if necessary.

6. Start the project:
npm run dev


## Technologies Used

- TypeScript
- Flexible tools and frameworks for later integration (e.g., NestJS in the `nest-project`)

## Reuse and Evolution

This project served as the foundation for the [`nest-project`](https://github.com/juliomchado/nest-project), where the domain structure and use cases were reused almost entirely. Thanks to the clean separation of layers and no tight coupling to specific frameworks at this stage, integration with NestJS was fast and efficient, demonstrating the practical value of applied architectural best practices.

## Contributing

Feel free to open issues, suggest improvements, or send pull requests. All support is welcome!

## License

Educational use project, open for study, adaptation, and evolution.

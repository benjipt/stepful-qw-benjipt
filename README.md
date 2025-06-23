# Stepful Quiz Wizard

This monorepo contains a Vite + React (TypeScript) frontend and a Ruby on Rails backend. All version management is handled via [asdf](https://asdf-vm.com/).

## Project Structure
```
/
├── frontend/ # Vite + React (TypeScript, Bun)
├── backend/  # Ruby on Rails API (SQLite)
├── .tool-versions
├── .gitignore
└── README.md
```

## Prerequisites
- [asdf](https://asdf-vm.com/) (version manager)
- [bun](https://bun.sh/) (for frontend)
- [Ruby](https://www.ruby-lang.org/) (handled by asdf)
- [Rails](https://rubyonrails.org/) (will be installed via gem)
- [Node.js](https://nodejs.org/) (for tooling, handled by asdf)

## Getting Started

Clone the repo and install tools with asdf:

```sh
git clone git@github.com:benjipt/stepful-qw-benjipt.git
cd stepful-qw-benjipt
asdf install
```

Copy the sample environment file and create your own `.env`:

```sh
cp .env.sample .env
```

Install dependencies in the root directory using Bun:

```sh
bun install
```

Install Ruby and Rails dependencies in the backend directory:

```sh
cd backend
bundle install
cd ..
```

After installing dependencies, set up the database by creating, migrating, and seeding it:

```sh
cd backend
bundle exec rails db:create db:migrate db:seed
cd ..
```

If you encounter errors about missing dependencies in `frontend/node_modules`, create a symlink after installing dependencies:

```sh
ln -s ../node_modules ./frontend/node_modules
```

This is needed because dependencies are hoisted to the project root.

## Running the App

From the root directory, start the backend and frontend servers in separate terminal tabs:

Start the backend:
```sh
bun dev:be
```

Start the frontend (in a new terminal tab):
```sh
bun dev:fe
```

## Linting, Formatting & Commits

### Biome
This project uses [Biome](https://biomejs.dev/) for linting and formatting all JavaScript/TypeScript code in the frontend. To check and automatically fix issues, run:

```sh
bun run lint
```

Biome is configured to check all files in `frontend/src/`.

### Pre-commit Hooks (lefthook)
[lefthook](https://github.com/evilmartians/lefthook) enforces code quality before commits. The pre-commit hook runs Biome (`bun run lint`) and will stage any fixes before completing the commit. This ensures all committed code is properly formatted and linted.

To manually run the pre-commit hook:
```sh
lefthook run pre-commit
```

### Conventional Commits
This project follows [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Please use the standard format (e.g., `feat: ...`, `fix: ...`, `chore: ...`) for all commits.

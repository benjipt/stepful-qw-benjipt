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

## Getting Started

### Prerequisites
- [asdf](https://asdf-vm.com/) (version manager)
- [bun](https://bun.sh/) (for frontend)
- [Ruby](https://www.ruby-lang.org/) (handled by asdf)
- [Rails](https://rubyonrails.org/) (will be installed via gem)
- [Node.js](https://nodejs.org/) (for tooling, handled by asdf)

Clone the repo and install tools with asdf:

```sh
git clone git@github.com:benjipt/stepful-qw-benjipt.git
cd stepful-qw-benjipt
asdf install
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

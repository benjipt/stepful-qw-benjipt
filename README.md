# Stepful Quiz Wizard

This monorepo contains a Vite + React (TypeScript) frontend and a Ruby on Rails backend. All version management is handled via [asdf](https://asdf-vm.com/).

## Project Structure
```
/
├── frontend/ # Vite + React (TypeScript, Bun)
├── backend/ # Ruby on Rails API (SQLite)
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

<span>
  <img alt="Slonito" width="100%" align="center" src="https://github.com/user-attachments/assets/a32a0822-804c-4ca8-9600-eff1fd45eef9" />
</span>

# 🐘 What is Slonito?

Slonito is a lightweight assistant that helps users generate PostgreSQL queries from natural language prompts. It was developed as part of an academic research project, aiming to support professionals with limited SQL knowledge in creating customized queries with greater speed, accuracy, and confidence.

This repository contains only the frontend, developed with Ruby on Rails, responsible for managing user accounts, chat sessions, and communicating with an external API powered by a fine-tuned LLM.

## Features

💬 Intuitive chat interface for natural language to SQL interaction

🔐 User authentication, session management, and access control

🧠 Schema input form with SQL structure validation

⚡ Dynamic updates via Turbo/Hotwire (no full-page reloads)

🧾 Chat history organized by database schema and query context

🌍 Fully decoupled: communicates with an external Python API

## Tech Stack

- Ruby 3.3.4
- Rails 7.1.3.4
- Node 22.5.1
- PostgreSQL 16.3

## Setup

```bash
git clone https://github.com/your-username/slonito-frontend.git
cd slonito-frontend
bundle install
rails db:setup
foreman start
```

Update your .env or credentials with the proper API endpoint:

```txt
SLONITO_API_URL=http://localhost:3001
```

# Related Repositories

[Slonito API](https://github.com/bellps/slonito-api) (Python) – Backend responsible for LLM integration and SQL query generation.

# 🐘 Who is Slonito?

Slonito is a pink elephant who loves SQL and decided to help every one that's facing trouble with this language ♥️. His name comes from Slonik, the official elephant mascot of PostgreSQL. In Russian, "slonik" means “little elephant”, so the project took that idea a step further by adding the Portuguese diminutive suffix "-ito", commonly used to describe something very small or cute.

So, Slonito is like saying “a tiny, tiny elephant” — a playful nod to the project’s lightweight nature and its connection to PostgreSQL. It’s small, helpful, and works hard behind the scenes to make your life with SQL just a bit easier. 🐘✨


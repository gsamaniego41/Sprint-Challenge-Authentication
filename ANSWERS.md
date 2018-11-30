<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

- Sessions provide state so the client's authentication persists across requests, instead of having to provide their credentials on every request.

2. What does bcrypt do to help us store passwords in a secure manner.

- bcrypt hashes the user's plain text password before storing it to the database

3. What does bcrypt do to slow down attackers?

- by using key derivation function. in addition to hashing, bcrypt adds the cost of time

4. What are the three parts of the JSON Web Token?

- header, payload, signature

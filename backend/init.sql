CREATE TABLE IF NOT EXISTS training (
  id SERIAL PRIMARY KEY,
  maxpulse INT NOT NULL,
  minpulse INT NOT NULL,
  avgpulse INT NOT NULL,
  steps INT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

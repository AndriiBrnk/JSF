CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  group_number INTEGER NOT NULL CHECK (group_number >= 0 AND group_number <= 999),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

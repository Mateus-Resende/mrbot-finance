CREATE TABLE IF NOT EXISTS
    categories(
      id UUID PRIMARY KEY,
      user_id VARCHAR(128) NOT NULL,
      name VARCHAR(128) UNIQUE NOT NULL,
      spending_limit FLOAT NOT NULL,
      current FLOAT DEFAULT 0.0,
      deleted_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );

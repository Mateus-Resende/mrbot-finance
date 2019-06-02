CREATE TABLE IF NOT EXISTS
    categories(
      id UUID PRIMARY KEY,
      user_id VARCHAR(128) NOT NULL,
      name VARCHAR(128) NOT NULL,
      spending_limit INTEGER NOT NULL,
      current INTEGER DEFAULT 0,
      deleted_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )

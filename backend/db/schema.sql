CREATE TABLE stateside_calls (
  id SERIAL PRIMARY KEY,
  caller VARCHAR(64) NOT NULL,
  phone VARCHAR(32) DEFAULT 'unknown',
  coords JSONB NOT NULL,
  notes TEXT,
  required_services JSONB NOT NULL,
  priority INT DEFAULT 3,
  state VARCHAR(32) DEFAULT 'incoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stateside_units (
  id VARCHAR(64) PRIMARY KEY,
  job VARCHAR(32) NOT NULL,
  status VARCHAR(32) DEFAULT 'available',
  coords JSONB,
  last_ping TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stateside_assignments (
  id SERIAL PRIMARY KEY,
  call_id INT REFERENCES stateside_calls(id) ON DELETE CASCADE,
  unit_id VARCHAR(64) REFERENCES stateside_units(id),
  service VARCHAR(16) NOT NULL,
  assigned_by VARCHAR(64) NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP NULL,
  cleared_at TIMESTAMP NULL
);

CREATE TABLE stateside_audit (
  id SERIAL PRIMARY KEY,
  actor VARCHAR(64) NOT NULL,
  action VARCHAR(32) NOT NULL,
  target_id VARCHAR(64) NOT NULL,
  meta JSONB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

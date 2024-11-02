-- SCENE TABLE
CREATE TABLE scenes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACTORS TABLE
CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AVATARS TABLE
CREATE TABLE avatars (
    id SERIAL PRIMARY KEY,
    actor_id INT REFERENCES actors(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL, -- URL to the avatar image (stored in S3, for instance)
    rpm_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SCENE_ACTORS TABLE (Many-to-Many relationship between scenes and actors)
CREATE TABLE scene_actors (
    id SERIAL PRIMARY KEY,
    scene_id INT REFERENCES scenes(id) ON DELETE CASCADE,
    actor_id INT REFERENCES actors(id) ON DELETE CASCADE
);

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed password for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id INT REFERENCES users(id) ON DELETE SET NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP, 
    is_active BOOLEAN DEFAULT TRUE, -- Mark session as inactive after expiration
    ip_address VARCHAR(45),
    user_agent TEXT, 
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER_SCENE_SELECTION TABLE
CREATE TABLE user_scene_selection (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(session_id) ON DELETE CASCADE, -- Links to session
    scene_id INT REFERENCES scenes(id) ON DELETE CASCADE,
    avatar_id INT REFERENCES avatars(id) ON DELETE SET NULL,
    qr_code_url VARCHAR(255), -- URL to the generated QR code image
    qr_code_expiration TIMESTAMP, -- Timestamp when QR code expires
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

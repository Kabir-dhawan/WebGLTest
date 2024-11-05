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
    gender int,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SCENE_ACTORS TABLE (Many-to-Many relationship between scenes and actors)
CREATE TABLE scene_actors (
    id SERIAL PRIMARY KEY,
    scene_id INT REFERENCES scenes(id) ON DELETE CASCADE,
    actor_id INT REFERENCES actors(id) ON DELETE CASCADE
);

-- AVATARS TABLE
CREATE TABLE avatars (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL, -- URL to the avatar image (stored in S3, for instance)
    avatar_url VARCHAR(500) NOT NULL,
    rpm_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) DEFAULT '', -- Store hashed password for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
----------------------------------------

-- UserScene Table (Mapping users to scenes)
CREATE TABLE user_scene (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scene_id INT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, scene_id) -- Ensure a user can't map to the same scene twice
);

-- UserSceneSession Table (Managing sessions with QR support)
CREATE TABLE user_scene_session (
    id SERIAL PRIMARY KEY,
    user_scene_id INT NOT NULL REFERENCES user_scene(id) ON DELETE CASCADE,
    session_id UUID DEFAULT gen_random_uuid(),
    qr_code_url VARCHAR(255),
    qr_code_expiration TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (session_id) -- Ensures unique sessions
);

-- UserSceneSessionAvatars Table (Map sessions with avatars and actors)
CREATE TABLE user_scene_session_avatars (
    id SERIAL PRIMARY KEY,
    user_scene_session_id INT NOT NULL REFERENCES user_scene_session(id) ON DELETE CASCADE,
    avatar_id INT NOT NULL REFERENCES avatars(id) ON DELETE CASCADE,
    actor_id INT NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
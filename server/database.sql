CREATE DATABASE pernprogram
CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    domain TEXT NOT NULL,
    program_type TEXT NOT NULL,
    registrations_status BOOLEAN NOT NULL,
    descriptions TEXT NOT NULL,
    placement_assurance BOOLEAN NOT NULL,
    image_url TEXT,
    university_name TEXT,
    faculty_profile_url TEXT,
    learning_hours INT NOT NULL,
    duration TEXT NOT NULL,
    certificate_diploma TEXT,
    eligibility_criteria TEXT NOT NULL
);


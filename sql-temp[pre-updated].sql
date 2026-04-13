CREATE TABLE Project (
    project_id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    status VARCHAR(50),
    min_amount FLOAT,
    max_amount FLOAT,
    current_amount FLOAT,
    created_at DATETIME,
    end_time DATETIME,
    organizer_user_id INT,
    FOREIGN KEY (organizer_user_id) REFERENCES User(user_id)
);

CREATE TABLE Organizer_Request (
    request_id INT PRIMARY KEY,
    user_id INT,
    status ENUM('PENDING','APPROVED','REJECTED'),
    request_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE User (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    role ENUM('DONOR','ORGANIZER','ADMIN'),
    --hardcoded as it is harder to implemet keep it simple bro
    --backend manages these handle

    created_at DATETIME
);

CREATE TABLE Project_Tag (
    tag_id INT PRIMARY KEY,
    tag_name VARCHAR(50)
);
--comment are added later-on
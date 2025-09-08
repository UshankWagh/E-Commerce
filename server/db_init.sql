use ratings_app;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL CHECK (CHAR_LENGTH(name) BETWEEN 20 AND 60),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email LIKE '_%@_%._%'),
    password CHAR(60) NOT NULL,
    address VARCHAR(400) NOT NULL,
    role INT NOT NULL
);

CREATE TABLE stores (
    store_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL CHECK (CHAR_LENGTH(name) >= 20 AND CHAR_LENGTH(name) <= 60),
    address VARCHAR(400) NOT NULL,
    ratings_sum INT NOT NULL,
    total_ratings INT NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE ratings (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating_value TINYINT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_store (user_id, store_id)
);

INSERT INTO users (name, email, password, address, role) VALUES
('Maximillian Featherstone', 'maximillian.featherstone@example.com', 'hashed_password_here', '221B Baker Street, London, UK', 1),
('Christopher Worthington', 'christopher.worthington@example.com', 'hashed_password_here', '742 Evergreen Terrace, Springfield, USA', 2),
('Alexanderson Kensington', 'alexanderson.kensington@example.com', 'hashed_password_here', '1600 Pennsylvania Ave NW, Washington, DC, USA', 1),
('Bartholomew Chamberlain', 'bartholomew.chamberlain@example.com', 'hashed_password_here', '10 Downing Street, London, UK', 2),
('Jonathan Underwoodsmith', 'jonathan.underwoodsmith@example.com', 'hashed_password_here', '350 Fifth Avenue, New York, NY, USA', 2);

INSERT INTO stores (name, address, ratings_sum, total_ratings, owner_id)
VALUES
('Elegant Home and Kitchen Essentials Store',
 '45 Maple Avenue, Near City Center Mall, Vadodara, Gujarat, India - 390001',
 425, 100, 1),

('TechZone Electronics and Accessories Hub',
 '2nd Floor, Crystal Plaza, Opp. Railway Station, Valsad, Gujarat, India - 396001',
 380, 80, 2),

('Gourmet Delights Organic Foods Market',
 'Shop No. 12, Green Valley Complex, Near Lakeview Garden, Surat, Gujarat, India - 395007',
 512, 120, 3),

('SportsPro Gear and Fitness Equipment Store',
 'Plot No. 45, Riverfront Plaza, Sabarmati, Ahmedabad, Gujarat, India - 380005',
 295, 60, 4),

('Urban Chic Apparel and Fashion Boutique',
 'Ground Floor, Royal Square, Opp. Central Bus Stand, Vadodara, Gujarat, India - 390002',
 440, 95, 5),

('PetCare Plus Pet Supplies and Essentials',
 '1st Floor, Sunshine Arcade, Near Park View Residency, Anand, Gujarat, India - 388001',
 355, 75, 6);

INSERT INTO ratings (user_id, store_id, rating_value)
VALUES
(1, 1, 5),
(2, 1, 4),
(3, 1, 5),
(4, 1, 3),

(5, 2, 4),
(1, 2, 3),
(2, 2, 5),
(3, 2, 4),

(4, 3, 5),
(5, 3, 3),
(1, 3, 4),
(2, 3, 5),

(3, 4, 4),
(4, 4, 5),
(5, 4, 3),

(1, 5, 5),
(2, 5, 4),
(3, 5, 5),

(4, 6, 3),
(5, 6, 4);


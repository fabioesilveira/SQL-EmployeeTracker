INSERT INTO department (department_name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Real Estate');


INSERT INTO role (title, salary, department_id)
VALUES 
('CEO', 700000.00, 1),
('Marketing Manager', 145000.00, 2),
('HR Manager', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Senior Engineer', 150000.00, 5),
('Asset Management Analyst', 165000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dustin', 'Storey', 1, 1),
('Fabio', 'Silveira', 2, 2),
('Edson', 'Dias', 3, 3),
('Sarah', 'Harper', 4, 4),
('Jefferson', 'Gomez', 5, 5),
('Kyle', 'Lanham', 6, 6);



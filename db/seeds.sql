INSERT INTO department (name)
VALUES
    ('Executives'),
    ('Accounting and Finance'),
    ('Tech'),
    ('HR'),
    ('External Affairs');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 350000, 1),
    ('Account Manager', 170000, 2),
    ('Data Analyst', 120000, 3),
    ('Software Developer', 100000, 3),
    ('CTO', 275000,2),
    ('CFO', 275000, 2),
    ('Account Manager', 85000, 5),
    ('HR Director', 125000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Ricky', 'Bobby', 1, null),
    ('Juan', 'Carlos', 2, 1),
    ('Kyle', 'Foregard', 3, 2),
    ('Steve', 'Willdoit', 4, null),
    ('Lebron', 'James', 5, 3),
    ('Brandon', 'Perez', 5, 1),
    ('Cindy', 'Hunt', 4, 5),
    ('Johnny', 'AppleSeed', 2, 6);



NSERT INTO department (name)
VALUES
    ('Executive'),
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
VALUES
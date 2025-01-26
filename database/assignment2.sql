-- Insert Tony Stark
INSERT INTO account
	(account_firstname, account_lastname, account_email, account_password)
VALUES
	('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Modify Tony Stark
UPDATE
	account
SET
	account_type = 'Admin'
WHERE
	account_id = 1;

-- Delete Tony Stark
DELETE
FROM
	account
WHERE
	account_id = 1;

-- Modify GM Hummer with REPLACE
UPDATE
	inventory
SET 
	inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE
	inv_model = 'Hummer';

-- Use Inner Join
SELECT
	inv_make, inv_model, classification_name
FROM
	inventory
INNER JOIN 
	classification 
ON
	inventory.classification_id = classification.classification_id
WHERE
	classification_name = 'Sport';

-- Update All Records
UPDATE
    inventory
SET
    inv_image = REPLACE(inv_image, 's/', 's/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 's/', 's/vehicles/');


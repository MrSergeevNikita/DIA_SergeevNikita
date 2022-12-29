drop database store;
CREATE DATABASE `store` CHARACTER SET utf8 COLLATE utf8_general_ci;
use store;
insert into categories (title, eng_title) values
("ремни","belts"), ("хорошая обувь","shoes"), ("головные уборы","hats"), ("погоны","shoulder straps");

insert into items (price, description, id_category, manufacturer, name) values 
(650, "голубая полоса, размеры 34-42", 1, "Россия", "тельняшка детская"),
(4700, "хромовая кожа, уставные", 2, "Россия", "ботинки берцы"),
(1200, "бесшовный 100% шерсть", 3, "Россия", "берет черный"),
(150, "светло-голубые", 4, "Россия", "погоны МЧС");
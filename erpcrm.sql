-- Database: `erpcrm`
CREATE TABLE `customer` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `sellerid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

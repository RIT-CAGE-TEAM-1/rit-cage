-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cage
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cage` ;

-- -----------------------------------------------------
-- Schema cage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cage` DEFAULT CHARACTER SET utf8 ;
USE `cage` ;

-- -----------------------------------------------------
-- Table `cage`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`user` ;

CREATE TABLE IF NOT EXISTS `cage`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL COMMENT 'may split fname, lname depending on LDAP',
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `UID` VARCHAR(10) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`reservation` ;

CREATE TABLE IF NOT EXISTS `cage`.`reservation` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `reservation_date` DATETIME NULL,
  `due_date` DATETIME NULL,
  `checkout_date` DATETIME NULL,
  `return_date` DATETIME NULL,
  `user_id` INT NOT NULL,
  `spec_request_description` VARCHAR(150) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`reservation_id`, `user_id`),
  INDEX `reservation_user_fk_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `reservation_user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `cage`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`item_model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`item_model` ;

CREATE TABLE IF NOT EXISTS `cage`.`item_model` (
  `item_model_id` INT NOT NULL AUTO_INCREMENT,
  `model_name` VARCHAR(100) NULL,
  `model_description` VARCHAR(150) NULL,
  `model_keywords` VARCHAR(150) NULL,
  PRIMARY KEY (`item_model_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`item_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`item_type` ;

CREATE TABLE IF NOT EXISTS `cage`.`item_type` (
  `item_type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(30) NULL,
  `type_description` VARCHAR(150) NULL,
  PRIMARY KEY (`item_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`item_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`item_category` ;

CREATE TABLE IF NOT EXISTS `cage`.`item_category` (
  `item_category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(30) NULL,
  `category_description` VARCHAR(150) NULL,
  PRIMARY KEY (`item_category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`item` ;

CREATE TABLE IF NOT EXISTS `cage`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_category_id` INT NOT NULL,
  `item_type_id` INT NOT NULL,
  `item_model_id` INT NOT NULL,
  `barcode` VARCHAR(20) NULL,
  `comments` VARCHAR(150) NULL,
  `tags` VARCHAR(150) NULL,
  `available` TINYINT NULL,
  `active` TINYINT NULL,
  `location` VARCHAR(45) NULL,
  `item_condition` VARCHAR(15) NULL,
  `serial` VARCHAR(30) NULL,
  PRIMARY KEY (`item_id`),
  INDEX `item_item_type_idx` (`item_type_id` ASC) VISIBLE,
  INDEX `item_item_category_fk_idx` (`item_category_id` ASC) VISIBLE,
  INDEX `item_item_model_fk_idx` (`item_model_id` ASC) VISIBLE,
  CONSTRAINT `item_item_model_fk`
    FOREIGN KEY (`item_model_id`)
    REFERENCES `cage`.`item_model` (`item_model_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_item_type_fk`
    FOREIGN KEY (`item_type_id`)
    REFERENCES `cage`.`item_type` (`item_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_item_category_fk`
    FOREIGN KEY (`item_category_id`)
    REFERENCES `cage`.`item_category` (`item_category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`kit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`kit` ;

CREATE TABLE IF NOT EXISTS `cage`.`kit` (
  `kit_id` INT NOT NULL,
  `creator_id` INT NOT NULL,
  `comments` VARCHAR(150) NULL,
  PRIMARY KEY (`kit_id`),
  INDEX `kit_user_fk_idx` (`creator_id` ASC) VISIBLE,
  CONSTRAINT `kit_user_fk`
    FOREIGN KEY (`creator_id`)
    REFERENCES `cage`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`kit_instance`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`kit_instance` ;

CREATE TABLE IF NOT EXISTS `cage`.`kit_instance` (
  `kit_instance_id` INT NOT NULL AUTO_INCREMENT,
  `kit_id` INT NOT NULL,
  PRIMARY KEY (`kit_instance_id`, `kit_id`),
  INDEX `kit_instance_kit_fk_idx` (`kit_id` ASC) VISIBLE,
  CONSTRAINT `kit_instance_kit_fk`
    FOREIGN KEY (`kit_id`)
    REFERENCES `cage`.`kit` (`kit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`reservation_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`reservation_item` ;

CREATE TABLE IF NOT EXISTS `cage`.`reservation_item` (
  `reservation_item_id` INT NOT NULL AUTO_INCREMENT,
  `reservation_id` INT NOT NULL,
  `item_id` INT NULL,
  `kit_instance_id` INT NULL,
  `item_model_id` INT NULL,
  PRIMARY KEY (`reservation_item_id`, `reservation_id`),
  INDEX `bundle_item_item_fk_idx` (`item_id` ASC) VISIBLE,
  INDEX `reservation_item_reservation_fk_idx` (`reservation_id` ASC) VISIBLE,
  INDEX `reservation_item_kit_instance_fk_idx` (`kit_instance_id` ASC) VISIBLE,
  INDEX `reservation_item_item_item_model_id_fk_idx` (`item_model_id` ASC) VISIBLE,
  CONSTRAINT `reservation_item_reservation_fk`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `cage`.`reservation` (`reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reservation_item_item_item_id_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `cage`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reservation_item_kit_instance_fk`
    FOREIGN KEY (`kit_instance_id`)
    REFERENCES `cage`.`kit_instance` (`kit_instance_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reservation_item_item_item_model_id_fk`
    FOREIGN KEY (`item_model_id`)
    REFERENCES `cage`.`item` (`item_model_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`incident`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`incident` ;

CREATE TABLE IF NOT EXISTS `cage`.`incident` (
  `incident_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `incident_date` DATE NULL,
  `description` VARCHAR(150) NOT NULL,
  `resolved_date` DATETIME NULL,
  PRIMARY KEY (`incident_id`, `user_id`, `item_id`),
  INDEX `incident_user_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `incident_item_fk_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `incident_user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `cage`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `incident_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `cage`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`kit_intance_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`kit_intance_item` ;

CREATE TABLE IF NOT EXISTS `cage`.`kit_intance_item` (
  `kit_intance_item_id` INT NOT NULL AUTO_INCREMENT,
  `kit_intance_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`kit_intance_item_id`, `kit_intance_id`, `item_id`),
  INDEX `kit_instance_item_item_fk_idx` (`item_id` ASC) VISIBLE,
  INDEX `kit_instance_item_kit_intance_fk_idx` (`kit_intance_id` ASC) VISIBLE,
  CONSTRAINT `kit_instance_item_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `cage`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `kit_instance_item_kit_intance_fk`
    FOREIGN KEY (`kit_intance_id`)
    REFERENCES `cage`.`kit_instance` (`kit_instance_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`kit_restriction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`kit_restriction` ;

CREATE TABLE IF NOT EXISTS `cage`.`kit_restriction` (
  `kit_access_id` INT NOT NULL AUTO_INCREMENT,
  `kit_id` INT NOT NULL,
  `class_code` VARCHAR(10) NULL,
  PRIMARY KEY (`kit_access_id`),
  INDEX `kit_restriction_kit_fk_idx` (`kit_id` ASC) VISIBLE,
  CONSTRAINT `kit_restriction_kit_fk`
    FOREIGN KEY (`kit_id`)
    REFERENCES `cage`.`kit` (`kit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`class` ;

CREATE TABLE IF NOT EXISTS `cage`.`class` (
  `class_id` INT NOT NULL AUTO_INCREMENT,
  `class_code` VARCHAR(10) NULL,
  PRIMARY KEY (`class_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`class_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`class_user` ;

CREATE TABLE IF NOT EXISTS `cage`.`class_user` (
  `class_user_id` INT NOT NULL AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`class_user_id`, `class_id`, `user_id`),
  INDEX `class_user_class_fk_idx` (`class_id` ASC) VISIBLE,
  INDEX `class_user_user_fk_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `class_user_class_fk`
    FOREIGN KEY (`class_id`)
    REFERENCES `cage`.`class` (`class_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `class_user_user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `cage`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cage`.`item_restriction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cage`.`item_restriction` ;

CREATE TABLE IF NOT EXISTS `cage`.`item_restriction` (
  `item_access_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `class_code` VARCHAR(10) NULL,
  PRIMARY KEY (`item_access_id`),
  INDEX `item_restriction_item_fk_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `item_restriction_item_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `cage`.`item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- HOTFIX
RENAME TABLE kit_intance_item TO kit_instance_item;
ALTER TABLE kit_instance_item RENAME COLUMN kit_intance_id TO kit_instance_id;
ALTER TABLE kit_instance_item RENAME COLUMN kit_intance_item_id TO kit_instance_item_id;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

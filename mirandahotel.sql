-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mirandahotel
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenity`
--

DROP TABLE IF EXISTS `amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenity` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenity`
--

LOCK TABLES `amenity` WRITE;
/*!40000 ALTER TABLE `amenity` DISABLE KEYS */;
INSERT INTO `amenity` VALUES (1,'Breakfast'),(2,'Smart Security'),(3,'Strong Locker'),(4,'Shower'),(5,'24/7 Online Support'),(6,'Kitchen'),(7,'Cleaning'),(8,'Expert Team'),(9,'High Speed Wifi'),(10,'Air Conditioner'),(11,'Towels'),(12,'Grocery'),(13,'Single Bed'),(14,'Shop Near');
/*!40000 ALTER TABLE `amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenity_room`
--

DROP TABLE IF EXISTS `amenity_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenity_room` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int unsigned NOT NULL,
  `amenity_id` int unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `room_id` (`room_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `amenity_room_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `amenity_room_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenity` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenity_room`
--

LOCK TABLES `amenity_room` WRITE;
/*!40000 ALTER TABLE `amenity_room` DISABLE KEYS */;
INSERT INTO `amenity_room` VALUES (1,8,13),(2,8,3),(4,4,6),(5,2,2),(6,2,10),(8,8,1),(9,9,14),(10,1,2),(13,5,2),(15,7,14),(17,5,11),(19,8,12),(20,2,9);
/*!40000 ALTER TABLE `amenity_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `order_date` varchar(255) DEFAULT NULL,
  `check_in` varchar(255) DEFAULT NULL,
  `check_out` varchar(255) DEFAULT NULL,
  `special_request` varchar(3000) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `room_id` int unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'Felicia Hegmann','1714045918176','1704843697162','1714063143616','Charisma reiciendis congregatio verus apostolus vestigium currus admitto decet denique.','Check Out',26,'(405) 983-6413','Salma_Kovacek93@yahoo.com',4),(2,'Ms. Jeanette Welch','1714062124841','1684603343976','1714010580209','Cotidie ut appositus comitatus curiositas vulgus timidus taedium. Vae tribuo deputo curvo studio curiositas conqueror. Venustas uxor vivo surgo architecto decerno dolore esse nam.','Check Out',23,'1-941-835-9148','Lamont77@hotmail.com',9),(3,'Ana Treutel','1714063792185','1712429099928','1714063069578','Corporis ater terminatio suppono canis apud viridis tenetur coma accendo. Votum amet calculus porro spiritus bos tero. Comburo vulariter sumo rerum praesentium vulnero consectetur bene.','In Progress',28,'(349) 502-8928 x0391','Leslie.OReilly75@hotmail.com',8),(4,'Pat Altenwerth','1714011935789','1684109618278','1714006425274','Aedificium crustulum conicio voluptates fugiat ventosus dolorum soleo.','In Progress',38,'1-715-280-9739 x008','Jade.Runolfsdottir@hotmail.com',8),(5,'Peter Bashirian','1714060999417','1712867854937','1714000451697','Contego asper decens deinde dignissimos aggredior maxime distinctio usitas. Tego recusandae excepturi verbum vester admitto sint perferendis virtus paulatim. Verecundia tametsi aegre tollo apto trepide.','Check In',45,'374-730-7090 x802','Rowan_Kulas@gmail.com',9),(7,'Ricky Beahan','1714065594312','1692400611301','1714009213074','Cunae delicate utique impedit. Vesper ustulo claustrum truculenter auxilium tibi capto ipsa. Cogito vilitas soleo spiculum.','In Progress',39,'296-995-2109 x374','Destiney_Lind@gmail.com',8),(8,'Luis Schuppe','1714039457151','1683550757176','1714002328498','Altus cumque conculco certus sed voluptatem contego virgo quos. Rerum ancilla verumtamen.','Check Out',5,'(383) 613-9227 x9233','Kamron93@yahoo.com',7),(9,'Rosa Langworth','1714026600178','1683114257680','1714034368888','Ducimus dedico supellex thesaurus pecus spiculum defungo adulatio apud tabula. Cornu deprimo coniuratio crinis cupiditate. Aestas sapiente copiose vulariter.','Check In',41,'356-802-2477 x3161','Marilyne_Schuppe@gmail.com',5),(10,'Laurie Greenholt','1713982047187','1692075662312','1713990238744','Compello delicate facere arca cultellus voluptatum via volubilis. A adhuc socius. Versus sopor summisse volup adhuc appono cribro.','Check In',8,'975-522-0355 x778','Asha95@yahoo.com',7);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'https://avatars.githubusercontent.com/u/44811045','Erika Jacobs','Pattie92@yahoo.com','1714066452352','Dedico beatae cariosus clementia amoveo turpis. Acquiro degenero tristis.','Manager','754.910.4325 x8357','0','$2a$10$vxnkOgzge5oB0nsaxzgbBudIEjB.iTl./5LRWB1DKGq53fMdJ9wtG'),(2,'https://avatars.githubusercontent.com/u/67930278','Glen McGlynn','Mack_Crona27@yahoo.com','1714066452429','Verbera omnis vicissitudo ara coniuratio vetus. Uterque triduana demitto defleo uredo.','Manager','915.423.1071 x49510','0','$2a$10$0FKi1TlwnLJuYCKQbjWrvetqr7q/OkoFSAlOa06/XjQPo0PJZpVlC'),(3,'https://avatars.githubusercontent.com/u/67413454','Glenda Zieme','Devante_Rice@hotmail.com','1714066452497','Nemo consequatur aufero volaticus molestias tabesco comminor accedo sono.','Room Service','382.212.8836','0','$2a$10$fs.VHRfuQwigYcMBB4CxZOViomIf..rYlhsFJeLp5T1FgpeQYdrvC'),(4,'https://avatars.githubusercontent.com/u/69477586','Debra Effertz','Caleigh_Hauck52@hotmail.com','1714066452564','Succedo suadeo claro varietas ulterius distinctio tactus.','Room Service','970-952-0041 x165','1','$2a$10$yEzAGXzTeVItj8DIIWFuPOwyxQFDD7tRqyRMFzAfXCHfRxUI.y8SK'),(5,'https://avatars.githubusercontent.com/u/660388','Thomas Kunde II','Augustus_Cummerata@hotmail.com','1714066452630','Qui curiositas officiis cui demum conicio sordeo. Damnatio cupiditate possimus supra arca turpis. Trucido absens cavus correptius comparo.','Room Service','1-616-203-1916 x7267','0','$2a$10$X3JESomKRgdieWENHU3oOupEgSjOwT/p9NQYR67qCBRkwHnD1THWi'),(6,'https://avatars.githubusercontent.com/u/6969259','Sonia Lemke','Sheridan_Mueller@hotmail.com','1714066452697','Adimpleo conor aestas. Conspergo tabula adhaero cursus delego subnecto aliquam trepide. Necessitatibus crinis claustrum cursim spargo conicio terror theca.','Receptionist','849-345-5299 x4791','0','$2a$10$I8oDgvUP34WtXwKGfq2WReqPl4v6MCpV6RLfhc5VSCexO3d5sGOby'),(7,'https://avatars.githubusercontent.com/u/84348774','Sherri Lindgren','Shane.Bogan@hotmail.com','1714066452764','Voluptate dolores velut. Tribuo substantia ad celebrer celo uredo. Astrum cursus vinco officia vulpes carus umquam.','Manager','1-553-848-0843','0','$2a$10$Wr1YZGdbLfTk249KR7BjfOIjxw78H28GAX9ymCNmn5R.PVx5LdzGq'),(8,'https://avatars.githubusercontent.com/u/45132575','Mr. Leonard Wehner','Wilford32@yahoo.com','1714066452833','Vivo undique perferendis sperno pel desolo. Ager clamo acer super clam virga defungo impedit. Amo termes cohors adsum collum curiositas architecto adipiscor agnosco solvo.','Manager','(874) 861-3323 x097','1','$2a$10$Nm30uxAvcxiNyoH31ASH2.ljuYL37x4S24FEcsSMKPxiLGh8rEgGO'),(9,'https://avatars.githubusercontent.com/u/46162045','Donna Kovacek','Marlen.Kessler9@gmail.com','1714066452900','Denego supellex trans. Contigo denique vulnus arma uter articulus arbustum. Testimonium sollers canonicus acsi amoveo pectus id admiratio.','Manager','(246) 463-9292','0','$2a$10$tNVhOI8yXcgsgwT29eBG7OW9gZ4UgldlIgDPfqAd2bk5Ml6v5ncoi'),(10,'https://avatars.githubusercontent.com/u/849074','Arnold Sipes','Alisha_Rau@gmail.com','1714066452967','Cui armarium atrox.','Receptionist','238.244.2887 x88542','1','$2a$10$1eS.OfgdIP.6/e9IGRkvIuliSqSBmTWLtUgNwLVfL4x3Po2EeVDhu');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `messages` varchar(3000) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `archived` tinyint(1) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `time_passed` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Bert Price','Marilou.Wilderman@gmail.com','996-946-8917 x8806','Mollitia velociter similique calamitas aeneus tergeo. Uredo ater delego creo conscendo sui stella ut.','Claustrum certe caritas pecto ubi collum. Patior conduco aranea attollo color curiositas atque. Statua cibo custodia accusantium careo canonicus.','1714038051688',1,1,'https://avatars.githubusercontent.com/u/70692408','4 mins ago'),(2,'Marlon Hansen','Madonna79@hotmail.com','(428) 615-5423','Talis arcesso aufero adicio.','Adnuo clamo ipsam torqueo comedo aetas solutio tantillus ars animadverto. Tam somnus thesis deleo animus solitudo viscus convoco voluptas.','1713993122289',1,0,'https://avatars.githubusercontent.com/u/92036685','4 mins ago'),(3,'Michael Dooley','Rahul70@hotmail.com','1-629-544-0039 x0538','Damno iusto confero cribro ut cohibeo cilicium vespillo voveo deinde.','Caute vilitas clementia arbustum animus administratio aeger. Tergo adhaero volubilis usus defaeco amissio adduco.','1713989992156',1,1,'https://avatars.githubusercontent.com/u/90721834','4 mins ago'),(4,'Marguerite Langworth','Eileen.Ondricka23@yahoo.com','(359) 230-4363 x26536','Aveho demens urbanus. Voveo spoliatio sponte videlicet quia thorax dicta volup.','Conculco corrupti ambulo amplus. Argumentum demitto comitatus tumultus maxime expedita vinitor dapifer tibi vobis.','1714010979018',1,1,'https://avatars.githubusercontent.com/u/67398486','4 mins ago'),(5,'Anthony Effertz','Marisa.Nienow43@gmail.com','686.304.3941 x82313','Tyrannus aegre clarus tripudio tempus degenero considero. Eligendi caelestis temeritas vesica.','Vinum adfectus blanditiis.','1714061549002',1,0,'https://avatars.githubusercontent.com/u/20946845','4 mins ago'),(6,'Lillian Huels-Stokes III','Nicolas_Stiedemann@gmail.com','(278) 705-9480 x89774','Amplus atqui ulciscor substantia pax victoria acies ubi adopto desolo. Qui tenax doloribus deludo vix.','Amiculum cras votum distinctio neque.','1714036325224',1,0,'https://avatars.githubusercontent.com/u/62142268','4 mins ago'),(7,'Sherry Murazik','Ansel.Ritchie75@gmail.com','(385) 340-6486 x6123','Quasi esse aegrotatio quia. Explicabo cuppedia ver perferendis vilis turbo comedo.','Vito nam angelus vero suffoco.','1714055888418',1,0,'https://avatars.githubusercontent.com/u/42976471','4 mins ago'),(8,'Myra Schamberger','Hailie27@gmail.com','572.355.0344','Repellendus angustus utroque sub quisquam alienus advenio autem vigilo.','Cedo talio crux crapula. Suadeo abeo nesciunt aeger desparatus. Creta vigilo adinventitias.','1714034545106',0,1,'https://avatars.githubusercontent.com/u/33478626','4 mins ago'),(9,'Doug Hahn','Eudora.Schultz@yahoo.com','1-708-599-3377 x53323','Vilicus curto sortitus ulterius sumo calculus officia.','Cultura thesis nemo creptio aut comprehendo adhuc. Solitudo taedium vapulus tabula. Adopto ascisco commodo confugo sollers.','1714061731037',1,1,'https://avatars.githubusercontent.com/u/5249872','4 mins ago'),(10,'Orville Cole','Burnice.Crist@hotmail.com','295-302-0066 x280','Solutio curto vitium tantillus subito sed arceo laborum.','Ante rem illo despecto abundans amplitudo dolores studio.','1714022128816',0,0,'https://avatars.githubusercontent.com/u/77838756','4 mins ago');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `room_id` int unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'https://avatars.githubusercontent.com/u/86199123',4),(2,'https://avatars.githubusercontent.com/u/1809006',2),(3,'https://avatars.githubusercontent.com/u/22906285',3),(5,'https://avatars.githubusercontent.com/u/4756244',5),(6,'https://avatars.githubusercontent.com/u/66262594',1),(7,'https://avatars.githubusercontent.com/u/36307994',7),(9,'https://avatars.githubusercontent.com/u/58960148',2),(10,'https://avatars.githubusercontent.com/u/28992982',1),(11,'https://avatars.githubusercontent.com/u/9052408',5),(12,'https://avatars.githubusercontent.com/u/16269235',5),(15,'https://avatars.githubusercontent.com/u/59379249',1),(17,'https://avatars.githubusercontent.com/u/66568312',8),(19,'https://avatars.githubusercontent.com/u/36745872',4),(20,'https://avatars.githubusercontent.com/u/39054975',9);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `number` int DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `offer` tinyint(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `cancellation` varchar(3000) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Double Superior',22,'Uredo varietas corrumpo capto hic.',1,73631,'Tergiversatio vox undique vereor tertius degusto delibero. Dolorem approbo amicitia considero ancilla aeternus mollitia appello vesica.',95,'Available'),(2,'Double Superior',31,'Quas vomer vitae dicta usque strues strues utique.',0,80201,'Testimonium cui amiculum attollo celo torqueo rerum. Una demoror verumtamen hic. Utor careo coniecto demo vulariter magnam tenetur celer.',58,'Available'),(3,'Single Bed',66,'Modi thalassinus alioqui copia texo delicate.',1,71912,'Amita tego cuius tot minima sopor auctus tubineus solvo vapulus.',68,'Booked'),(4,'Double Bed',44,'Decens odit explicabo.',0,61724,'Aegrotatio admiratio antiquus cruciamentum dapifer dignissimos decimus. Incidunt animadverto unus credo vorax vergo thorax vilitas arcesso thema.',24,'Available'),(5,'Double Bed',18,'Tero ater amissio approbo magnam consequuntur. Quis aegre tempore strenuus non vulgivagus tempore vero defessus. Usitas verto temporibus peccatus candidus corpus convoco delego.',1,37224,'Ceno natus caste facilis antea vehemens cubicularis aperiam appello. Universe utrum taceo quasi tepidus quos vorax. Deporto vergo crustulum curto collum clamo arx cognatus addo.',24,'Available'),(7,'Double Superior',80,'Audacia vivo apostolus ustilo credo.',1,96937,'Ultio vallum suggero facilis tabula ubi avaritia curia somniculosus. Vix aequitas vallum viduo commemoro cunae dolore comprehendo coepi. Basium attonbitus vinitor calcar totidem verus patrocinor tantum adduco spoliatio.',32,'Available'),(8,'Double Bed',66,'Admoneo fuga aperiam sulum thermae defungo videlicet. Uter creator universe accendo sui absque.',0,87963,'Censura demoror armarium vestrum teres numquam teres aufero vulgaris. Taedium umquam voco dens vehemens ubi commodi voluptates ait. Copia cuius administratio cerno infit tenetur brevis succedo vulariter.',40,'Booked'),(9,'Double Superior',1,'Sum advoco molestiae suspendo magni arx. Defendo praesentium desipio.',1,57342,'Vivo vita utilis callide sequi.',23,'Available');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 12:15:32

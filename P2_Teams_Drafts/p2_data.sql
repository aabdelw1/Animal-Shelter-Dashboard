USE cs6400_sp20_team054;

INSERT INTO Vaccine (Species_Name,Vaccine_Type,Require_for_Adoption) VALUES
('Cat','Bordetella',0),
('Cat','Feline Calicivirus',1),
('Cat','Feline Chlamydia',0),
('Cat','Feline Herpes',1),
('Cat','Feline Immunodeficiency',0), 
('Cat','Feline Leukemia',1),
('Cat','Feline Panleukopenia',1),
('Cat','Rabies',1),
('Dog','Bordetella',0),
('Dog','Canine Adenovirus-2',1),
('Dog','Canine Influenza',0),
('Dog','Coronavirus',0),
('Dog','Distemper',1),
('Dog','Leptospirosis',1),
('Dog','Lyme Disease',0),
('Dog','Parainfluenza',0),
('Dog','Parvovirus',1),
('Dog','Rabies',1);


INSERT INTO Species(Name,Max_Per_Shelter) VALUES ('Cat',100),('Dog',100);

INSERT INTO Breed(Species_Name,Name) VALUES
('Cat','Abyssinian'),
('Cat','Aegean Cat'),
('Cat','American Bobtail'),
('Cat','American Curl'),
('Cat','American Shorthair'),
('Cat','American Wirehair'),
('Cat','Balinese'),
('Cat','Bengal'),
('Cat','Birman'),
('Cat','Bombay'),
('Cat','British Shorthair'),
('Cat','Burmese'),
('Cat','Burmilla'),
('Cat','Chartreux'),
('Cat','Cornish Rex'),
('Cat','Cymric'),
('Cat','Devon Rex'),
('Cat','Egyptian Mau'),
('Cat','Exotic Shorthair'),
('Cat','Havana Brown'),
('Cat','Himalayan'),
('Cat','Japanese Bobtail'),
('Cat','Javanese'),
('Cat','Korat'),
('Cat','Kurilian Bobtail'),
('Cat','Ragdoll'),
('Cat','LaPerm'),
('Cat','Li Hua'),
('Cat','Maine Coon'),
('Cat','Manx'),
('Cat','Munchkin'),
('Cat','Norwegian Forest Cat'),
('Cat','Ocicat'),
('Cat','Oriental'),
('Cat','Persian'),
('Cat','Pixiebob'),
('Cat','Ragamuffin'),
('Cat','Russian Blue'),
('Cat','Savannah'),
('Cat','Scottish Fold'),
('Cat','Selkirk Rex'),
('Cat','Siamese'),
('Cat','Siberian'),
('Cat','Singapura'),
('Cat','Somali'),
('Cat','Sphynx'),
('Cat','Tonkinese'), 
('Cat','Toyger'),
('Cat','Turkish Angora'), 
('Cat','Turkish Van'),
('Cat','Mixed'),
('Cat','Unknown');


INSERT INTO Breed(Species_Name,Name) VALUES
('Dog','Affenpinscher'),
('Dog','Afghan Hound'),
('Dog','Airedale Terrier'),
('Dog','Akbash Dog'),
('Dog','Akita'),
('Dog','Alapaha Blue Blood Bulldog'),
('Dog','Alaskan Husky'),
('Dog','Alaskan Malamute'),
('Dog','Boykin Spaniel'),
('Dog','Bracco Italiano'),
('Dog','Briard'),
('Dog','Brittany'),
('Dog','Brussels Griffon'),
('Dog','Bull Terrier'),
('Dog','Bulldog'),
('Dog','Bullmastiff'),
('Dog','German Shorthaired Pointer'),
('Dog','Mudi'),
('Dog','Shih Tzu'),
('Dog','Finnish Spitz'),
('Dog','Flat-Coated Retriever'),
('Dog','Fox Terrier'),
('Dog','French Bulldog'),
('Dog','German Pinscher'),
('Dog','German Shepherd Dog'),
('Dog','German Spitz'),
('Dog','Manchester Terrier'), 
('Dog','Mastiff'),
('Dog','Miniature American Shepherd'),
('Dog','Miniature Bull Terrier'),
('Dog','Miniature Pinscher'),
('Dog','Miniature Schnauzer'),
('Dog','Neapolitan Mastiff'),
('Dog','Schnoodle'), 
('Dog','Scottish Deerhound'), 
('Dog','Scottish Terrier'),
('Dog','Sealyham Terrier'),
('Dog','Shetland Sheepdog'),
('Dog','Shiba Inu'),
('Dog','Shihpoo'),   
('Dog','American Bulldog'),
('Dog','American Eskimo'),
('Dog','American Foxhound'),
('Dog','American Pit Bull Terrier'),
('Dog','American Staffordshire Terrier'),
('Dog','American Water Spaniel'),
('Dog','Anatolian Shepherd Dog'),
('Dog','Aussiedoodle'),
('Dog','Australian Cattle Dog'),
('Dog','Australian Kelpie'), 
('Dog','Australian Shepherd'), 
('Dog','Australian Terrier'),
('Dog','Azawakh'),
('Dog','Basador'),
('Dog','Basenji'),
('Dog','Basset Bleu de Gascogne'),
('Dog','Basset Hound'),
('Dog','Beagle'),
('Dog','Bearded Collie'),
('Dog','Beauceron'),
('Dog','Bedlington Terrier'),
('Dog','Belgian Laekenois'), 
('Dog','Belgian Malinois'), 
('Dog','Belgian Sheepdog'),
('Dog','Belgian Tervuren'),
('Dog','Cairn Terrier'),
('Dog','Canaan Dog'), 
('Dog','Cane Corso'),
('Dog','Cardigan Welsh Corgi'),
('Dog','Catahoula Leopard Dog'),
('Dog','Caucasian Ovcharka'),
('Dog','Cavalier King Charles Spaniel'),
('Dog','Cavapom'),
('Dog','Cavapoo'),
('Dog','Cesky Terrier'),
('Dog','Chart Polski'),
('Dog','Chesapeake Bay Retriever'), 
('Dog','Chihuahua'),
('Dog','Chinese Crested'),
('Dog','Chinese Shar-Pei'),
('Dog','Chinook'),
('Dog','Chow Chow'),
('Dog','Chug'),
('Dog','Cirneco dell''Etna'),
('Dog','Clumber Spaniel'),
('Dog','Cockapoo'),
('Dog','Cocker Spaniel'), 
('Dog','Collie'),
('Dog','Coton de Tulear'),
('Dog','Curly-Coated Retriever'),
('Dog','German Wirehaired Pointer'),
('Dog','Giant Schnauzer'),
('Dog','Glen of Imaal Terrier'),
('Dog','Golden Retriever'),
('Dog','Goldendoodle'),
('Dog','Gordon Setter'),
('Dog','Great Dane'),
('Dog','Great Pyrenees'),
('Dog','Greater Swiss Mountain Dog'),
('Dog','Greyhound'), 
('Dog','Harrier'),
('Dog','Havanese'), 
('Dog','Ibizan Hound'),
('Dog','Icelandic Sheepdog'),
('Dog','Irish Red and White Setter'),
('Dog','Irish Setter'),
('Dog','Irish Terrier'),
('Dog','Irish Water Spaniel'),
('Dog','Irish Wolfhound'), 
('Dog','Italian Greyhound'),
('Dog','Jack Russell Terrier'),
('Dog','Japanese Chin'), 
('Dog','Keeshond'),
('Dog','Kerry Blue Terrier'),
('Dog','Komondor'),
('Dog','Newfoundland'),
('Dog','Norfolk Terrier'), 
('Dog','Norwegian Buhund'),
('Dog','Norwegian Elkhound'),
('Dog','Norwegian Lundehund'),
('Dog','Norwich Terrier'),
('Dog','Nova Scotia Duck Tolling Retriever'),
('Dog','Old English Sheepdog'),
('Dog','Otterhound'),
('Dog','Papillon'),
('Dog','Pekeapoo'),
('Dog','Pekingese'),
('Dog','Pembroke Welsh Corgi'),
('Dog','Perro de Presa Canario'),
('Dog','Peruvian Inca Orchid'),
('Dog','Petit Basset Griffon Vendeen'),
('Dog','Pharaoh Hound'),
('Dog','Plott'),
('Dog','Pointer'),
('Dog','Polish Lowland Sheepdog'),
('Dog','Pomapoo'),
('Dog','Pomeranian'),
('Dog','Pomsky'),
('Dog','Poodle'),
('Dog','Portuguese Podengo'),
('Dog','Siberian Husky'),
('Dog','Silken Windhound'),
('Dog','Silky Terrier'),
('Dog','Skye Terrier'),
('Dog','Sloughi'),
('Dog','Small Munsterlander Pointer'),
('Dog','Soft Coated Wheaten Terrier'),
('Dog','Spanish Greyhound'), 
('Dog','Spanish Water Dog'),
('Dog','Spinone Italiano'), 
('Dog','Sprollie'),
('Dog','Staffordshire Bull Terrier'),
('Dog','Standard Schnauzer'),
('Dog','Sussex Spaniel'),
('Dog','Swedish Lapphund'),
('Dog','Swedish Vallhund'),
('Dog','Thai Ridgeback'), 
('Dog','Tibetan Mastiff'),
('Dog','Tibetan Spaniel'), 
('Dog','Tibetan Terrier'),
('Dog','Tosa Ken'),
('Dog','Toy Fox Terrier'), 
('Dog','Toy Poodle'),
('Dog','Treeing Walker Coonhound'), 
('Dog','Vizsla'),
('Dog','Bergamasco'),
('Dog','Berger Picard'),
('Dog','Bernese Mountain Dog'),
('Dog','Bichon Frise'),
('Dog','Black and Tan Coonhound'),
('Dog','Black Russian Terrier'),
('Dog','Bloodhound'),
('Dog','Blue Picardy Spaniel'),
('Dog','Bluetick Coonhound'), 
('Dog','Boerboel'),
('Dog','Bolognese'),
('Dog','Border Collie'),
('Dog','Border Terrier'),
('Dog','Borzoi'),
('Dog','Boston Terrier'),
('Dog','Bouvier des Flandres'),
('Dog','Boxer'),
('Dog','Dachshund'),
('Dog','Dalmatian'),
('Dog','Dandie Dinmont Terrier'),
('Dog','Doberman Pinscher'),
('Dog','Dogo Argentino'),
('Dog','Dogue de Bordeaux'),
('Dog','Doxiepoo'),
('Dog','English Cocker Spaniel'),
('Dog','English Foxhound'),
('Dog','English Setter'),
('Dog','English Springer Spaniel'),
('Dog','English Toy Spaniel'),
('Dog','Entlebucher Mountain Dog'),
('Dog','Eurasier'),
('Dog','Field Spaniel'),
('Dog','Fila Brasileiro'),
('Dog','Finnish Lapphund'),
('Dog','Kooikerhondje'),
('Dog','Kromfohrlander'),
('Dog','Kuvasz'),
('Dog','Labradoodle'),
('Dog','Labrador Retriever'),
('Dog','Lacy Dog'),
('Dog','Lagotto Romagnolo'),
('Dog','Lakeland Terrier'),
('Dog','Large Munsterlander'),
('Dog','Leonberger'),
('Dog','Lhasa Apso'),
('Dog','Lhasapoo'),
('Dog','Longdog'),
('Dog','Lowchen Lurcher Maltese'),
('Dog','Maltipoo'),
('Dog','Portuguese Water Dog'),
('Dog','Pug'),
('Dog','Pugapoo'),
('Dog','Puggle'),
('Dog','Puli'),
('Dog','Pumi'),
('Dog','Pyrenean Shepherd'),
('Dog','Rat Terrier'),
('Dog','Redbone Coonhound'),
('Dog','Rhodesian Ridgeback'), 
('Dog','Rottweiler'),
('Dog','Russian Toy'),
('Dog','Saint Bernard'),
('Dog','Saluki'),
('Dog','Samoyed'),
('Dog','Schapendoes'),
('Dog','Schipperke'),
('Dog','Volpino Italiano'),
('Dog','Weimaraner'),
('Dog','Welsh Springer Spaniel'),
('Dog','Welsh Terrier'),
('Dog','West Highland White Terrier'), 
('Dog','Whippet'),
('Dog','Wirehaired Pointing Griffon'),
('Dog','Wirehaired Vizsla'),
('Dog','Xoloitzcuintli'),
('Dog','Yorkipoo'),
('Dog','Yorkshire Terrier'),
('Dog','Mixed'),
('Dog','Unknown');


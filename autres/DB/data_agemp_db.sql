--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

-- Started on 2024-04-19 15:59:37 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3609 (class 0 OID 22747)
-- Dependencies: 215
-- Data for Name: specialite; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.specialite (code_specialite, nom_specialite) VALUES ('GL', 'genie logiciel');
INSERT INTO public.specialite (code_specialite, nom_specialite) VALUES ('MI', 'Math informatique');


--
-- TOC entry 3611 (class 0 OID 22756)
-- Dependencies: 217
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.section (id_section, code_section, niveau, code_specialite) VALUES (1, 'A', 'M1', 'GL');


--
-- TOC entry 3613 (class 0 OID 22773)
-- Dependencies: 219
-- Data for Name: groupe; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.groupe (id_groupe, code_groupe, id_section) VALUES (1, 'G1', 1);
INSERT INTO public.groupe (id_groupe, code_groupe, id_section) VALUES (2, 'G2', 1);
INSERT INTO public.groupe (id_groupe, code_groupe, id_section) VALUES (3, 'G3', 1);
INSERT INTO public.groupe (id_groupe, code_groupe, id_section) VALUES (4, 'G4', 1);
INSERT INTO public.groupe (id_groupe, code_groupe, id_section) VALUES (5, 'G5', 1);


--
-- TOC entry 3620 (class 0 OID 22843)
-- Dependencies: 226
-- Data for Name: emploisdutemps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.emploisdutemps (id_emp, id_groupe, niveau, semestre,annee) VALUES (1, 1, 'M1', 'S1',2024);


--
-- TOC entry 3623 (class 0 OID 22879)
-- Dependencies: 229
-- Data for Name: local; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.local (code_local, capacite, type) VALUES ('b5s112', 60, 'SalleTD');
INSERT INTO public.local (code_local, capacite, type) VALUES ('b5s120', 40, 'SalleTD');
INSERT INTO public.local (code_local, capacite, type) VALUES ('b1s1', 30, 'SalleTP');
INSERT INTO public.local (code_local, capacite, type) VALUES ('Amphi16', 200, 'Amphi');


--
-- TOC entry 3621 (class 0 OID 22855)
-- Dependencies: 227
-- Data for Name: module; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.module (code_module, nom_module) VALUES ('PA', 'programmation avancee');
INSERT INTO public.module (code_module, nom_module) VALUES ('BDD', 'base des donnees');
INSERT INTO public.module (code_module, nom_module) VALUES ('POO', 'programmation oriente objet');
INSERT INTO public.module (code_module, nom_module) VALUES ('PS', 'PS');
INSERT INTO public.module (code_module, nom_module) VALUES ('AIE', 'AIE');
INSERT INTO public.module (code_module, nom_module) VALUES ('TOP', 'TOP');
INSERT INTO public.module (code_module, nom_module) VALUES ('MC', 'MC');
INSERT INTO public.module (code_module, nom_module) VALUES ('Req-Con', 'Req-Con');
INSERT INTO public.module (code_module, nom_module) VALUES ('Anglais', 'Anglais');


--
-- TOC entry 3625 (class 0 OID 22887)
-- Dependencies: 231
-- Data for Name: seance; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (3, 'PA', 'GL', 'TD', 'M1', 'S1');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (4, 'BDD', 'MI', 'TD', 'L2', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (5, 'PA', 'GL', 'Cours', 'M1', 'S1');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (6, 'PA', 'GL', 'TP', 'M1', 'S1');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (7, 'BDD', 'MI', 'Cours', 'L2', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (8, 'BDD', 'MI', 'TP', 'L2', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (10, 'PS', 'GL', 'TD', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (9, 'PS', 'GL', 'Cours', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (11, 'PS', 'GL', 'TP', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (12, 'AIE', 'GL', 'TD', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (13, 'AIE', 'GL', 'TP', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (14, 'TOP', 'GL', 'Cours', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (15, 'TOP', 'GL', 'TD', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (16, 'MC', 'GL', 'Cours', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (17, 'MC', 'GL', 'TD', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (18, 'MC', 'GL', 'TP', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (19, 'Req-Con', 'GL', 'Cours', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (20, 'Req-Con', 'GL', 'TD', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (21, 'Req-Con', 'GL', 'TP', 'M1', 'S2');
INSERT INTO public.seance (id_seance, code_module, code_specialite, type, niveau, semestre) VALUES (22, 'Anglais', 'GL', 'TD', 'M1', 'S2');


--
-- TOC entry 3627 (class 0 OID 22909)
-- Dependencies: 233
-- Data for Name: creneau; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.creneau (id_creneau, debut, fin, jour, id_emp, id_seance, code_local) VALUES (1, '08:00:00', '09:30:00', 'Dimanche', 1, 6, 'b1s1');
INSERT INTO public.creneau (id_creneau, debut, fin, jour, id_emp, id_seance, code_local) VALUES (2, '08:00:00', '09:30:00', 'Dimanche', 1, 4, 'b5s112');
INSERT INTO public.creneau (id_creneau, debut, fin, jour, id_emp, id_seance, code_local) VALUES (3, '13:00:00', '14:30:00', 'Jeudi', 1, 19, 'b5s112');


--
-- TOC entry 3615 (class 0 OID 22789)
-- Dependencies: 221
-- Data for Name: personne; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (24, 'test', 'test', 'test@se.univ-bejaia.dz', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Administrateur', 'jsp', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (1, 'admin', 'admin', 'admin@admin.admin', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Administrateur', 'Admin technicien ', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (2, 'Doe', 'Speed', 'admin22@admin.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Administrateur', 'Admin assistant ', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (3, 'Garcia', 'Carlos', 'carlos.garcia@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2018, 'Licence', NULL, 1, 'GL');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (5, 'Martin', 'Pierre', 'pierre.martin@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2019, 'Master', NULL, 2, 'MI');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (6, 'Dubois', 'Marie', 'marie.dubois@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Professeur', NULL, NULL, 6, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (7, 'Johnson', 'Michael', 'michael.johnson@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2020, 'Licence', NULL, 2, 'MI');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (8, 'Chen', 'Ling', 'ling.chen@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Doctorant', NULL, NULL, 7, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (9, 'Kumar', 'Raj', 'raj.kumar@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2017, 'Master', NULL, 1, 'GL');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (10, 'Gonzalez', 'Maria', 'maria.gonzalez@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'vacataire', NULL, NULL, 4, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (11, 'Li', 'Wei', 'wei.li@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'vacataire', NULL, NULL, 3, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (12, 'Kim', 'Yuna', 'yuna.kim@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2021, 'Licence', NULL, 1, 'GL');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (13, 'Martinez', 'Antonio', 'antonio.martinez@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'vacataire', NULL, NULL, 9, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (14, 'Nguyen', 'Linh', 'linh.nguyen@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2020, 'Master', NULL, 1, 'MI');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (15, 'Gomez', 'Ana', 'ana.gomez@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Professeur', NULL, NULL, 4, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (16, 'Wilson', 'David', 'david.wilson@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2019, 'Licence', NULL, 1, 'MI');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (17, 'Roy', 'Sophie', 'sophie.roy@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Doctorant', NULL, NULL, 6, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (18, 'Singh', 'Amit', 'amit.singh@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2018, 'Master', NULL, 2, 'MI');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (19, 'Fernandez', 'Laura', 'laura.fernandez@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Doctorant', NULL, NULL, 8, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (20, 'Wang', 'Xiao', 'xiao.wang@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Etudiant', NULL, 2021, 'Licence', NULL, 1, 'GL');
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (21, 'Doe', 'John', 'john.doe@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Administrateur', 'Admin Principal', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (22, 'Smith', 'Jane', 'jane.smith@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Professeur', NULL, NULL, 5, NULL, NULL);
INSERT INTO public.personne (matricule, nom, prenom, email, password, type, role, anneebac, niveau, charges, id_groupe, code_specialite) VALUES (23, 'Dupont', 'Sophie', 'sophie.dupont@example.com', '$2b$10$5fTEPpmMs8UfRi.1/12ARuovv5uE6EHACFAc7K7SoV3ac/x2H1llC', 'Enseignant', 'Professeur', NULL, NULL, 8, NULL, NULL);


--
-- TOC entry 3628 (class 0 OID 22936)
-- Dependencies: 234
-- Data for Name: ensetcreneaux; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ensetcreneaux (matricule, id_creneau) VALUES (7, 2);
INSERT INTO public.ensetcreneaux (matricule, id_creneau) VALUES (6, 1);
INSERT INTO public.ensetcreneaux (matricule, id_creneau) VALUES (8, 2);
INSERT INTO public.ensetcreneaux (matricule, id_creneau) VALUES (7, 3);


--
-- TOC entry 3617 (class 0 OID 22816)
-- Dependencies: 223
-- Data for Name: occupation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.occupation (id_occup, jour, heur_debut, heur_fin) VALUES (1, 'Lundi', '08:00:00', '13:00:00');
INSERT INTO public.occupation (id_occup, jour, heur_debut, heur_fin) VALUES (2, 'Dimanche', '08:00:00', '09:30:00');
INSERT INTO public.occupation (id_occup, jour, heur_debut, heur_fin) VALUES (3, 'Dimanche', '08:00:00', '11:00:00');


--
-- TOC entry 3618 (class 0 OID 22827)
-- Dependencies: 224
-- Data for Name: ensetoccup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (7, 1);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (6, 1);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (8, 1);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (6, 3);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (10, 2);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (22, 1);
INSERT INTO public.ensetoccup (matricule, id_occup) VALUES (19, 3);


--
-- TOC entry 3622 (class 0 OID 22863)
-- Dependencies: 228
-- Data for Name: moduleens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('POO', 7, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('BDD', 7, 3);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('PS', 6, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('PS', 8, 3);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('MC', 6, 2);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('MC', 8, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('MC', 13, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('Req-Con', 22, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('TOP', 15, 3);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('TOP', 19, 2);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('Anglais', 19, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('AIE', 17, 2);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('AIE', 13, 1);
INSERT INTO public.moduleens (code_module, matricule, priorite) VALUES ('AIE', 10, 3);


--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 232
-- Name: creneau_id_creneau_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.creneau_id_creneau_seq', 2, true);


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 225
-- Name: emploisdutemps_id_emp_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emploisdutemps_id_emp_seq', 1, true);


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 218
-- Name: groupe_id_groupe_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groupe_id_groupe_seq', 1, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 222
-- Name: occupation_id_occup_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.occupation_id_occup_seq', 3, true);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 220
-- Name: personne_matricule_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personne_matricule_seq', 24, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 230
-- Name: seance_id_seance_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seance_id_seance_seq', 22, true);


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 216
-- Name: section_id_section_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.section_id_section_seq', 4, true);


-- Completed on 2024-04-19 15:59:37 CET

--
-- PostgreSQL database dump complete
--


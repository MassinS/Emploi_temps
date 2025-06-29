
-- Creation des ENUMS
create type TypePersonne as enum('Administrateur', 'Enseignant','Etudiant');
create type TypeLocal as enum('Amphi', 'SalleTD', 'SalleTP');
create type TypeSeance as enum('Cours', 'TD', 'TP');
create type jour as enum('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');

-- Creation des Tables
create table specialite(
	code_specialite varchar(10),
	nom_specialite varchar(50),
	constraint pk_specialite primary key(code_specialite),
	constraint nn_nom_specialite check(nom_specialite is not null),
	constraint un_nom_specialite unique(nom_specialite)
);


create table section(
	id_section serial,
	code_section varchar(10),
	niveau varchar(10),
	code_specialite varchar(10),
	constraint pk_section primary key(id_section),
	constraint fk_specialite foreign key(code_specialite) references specialite(code_specialite) on update cascade on delete cascade,
	constraint nn_code_section check(code_section is not null),
	constraint nn_niveau check(niveau is not null),
	constraint nn_code_specialite check(code_specialite is not null),
	constraint un_niveau_specialite_section unique(niveau, code_specialite, code_section)
);

create table groupe(
	id_groupe serial,
	code_groupe varchar(4),
	id_section integer,
	constraint pk_groupe primary key(id_groupe),
	constraint fk_section foreign key(id_section) references section(id_section) on update cascade on delete cascade,
	constraint nn_section check(id_section is not null),
	constraint nn_code_groupe check(code_groupe is not null),
	constraint un_section_groupe unique(code_groupe, id_section)
);

create table personne(
	matricule bigserial,
	nom varchar(30),
	prenom varchar(30),
	email varchar(80),
	password text,
	type TypePersonne,
	role varchar(50),
	anneeBac numeric(4),
	niveau varchar(10),
	charges integer,
	id_groupe integer,
	code_specialite varchar(10),
	constraint pk_personne Primary Key(matricule),
	constraint fk_groupe Foreign Key(id_groupe) references groupe(id_groupe) on update cascade on delete cascade,
	constraint fk_specialite Foreign Key(code_specialite) references specialite(code_specialite) on update cascade on delete cascade,
	constraint un_email unique(email),
	constraint nn_nom check(nom is not null),
	constraint nn_prenom check(prenom is not null),
	constraint nn_email check(email is not null),
	constraint nn_password check(password is not null),
	constraint nn_type check(type is not null),
	constraint nn_attrs_admin_ens_etd check( 
		(
			type in ('Administrateur') 
			and role is not null
			and anneeBac is null
			and niveau is null
			and charges is null
			and id_groupe is null
			and code_specialite is null
		) or
		(
			type in ('Enseignant') 
			and role is not null
			and anneeBac is null
			and niveau is null
			and charges is not null
			and id_groupe is null
			and code_specialite is null
		) or
		(
			type in ('Etudiant') 
			and role is null
			and anneeBac is not null
			and niveau is not null
			and charges is null
			and id_groupe is not null
			and code_specialite is not null
		)

	)
	
);

create table occupation(
	id_occup serial,
	jour jour,
	heur_debut time,
	heur_fin time,
	constraint pk_occup primary key(id_occup),
	constraint nn_jour check(jour is not null),
	constraint nn_heurD check(heur_debut is not null),
	constraint nn_heurF check(heur_fin is not null),
	constraint un_jourHeurDHeurF unique(jour, heur_debut, heur_fin)
);

create table ensetoccup(
	matricule bigint,
	id_occup integer,
	constraint pk_ensetoccup primary key(matricule, id_occup),
	constraint fk_personne foreign key(matricule) references personne(matricule) on update cascade on delete cascade,
	constraint fk_occupation foreign key(id_occup) references occupation(id_occup) on update cascade on delete cascade
);

create table emploisdutemps(
	id_emp serial,
	id_groupe integer,
	niveau varchar(10),
	semestre varchar(3),
	annee numeric(4),
	constraint pk_emploisdutemps primary key(id_emp),
	constraint fk_groupe foreign key(id_groupe) references groupe(id_groupe) on update cascade on delete cascade,
	constraint nn_groupe check(id_groupe is not null),
	constraint nn_niveau check(niveau is not null),
	constraint nn_semestre check(semestre is not null),
	constraint nn_annee check ( annee is not null ),
	constraint un_groupe_niveau_semestre_annee unique(id_groupe, niveau, semestre, annee)
);

create table module(
	code_module varchar(10),
	nom_module varchar(50),
	constraint pk_module primary key(code_module),
	constraint nn_nom_module check(nom_module is not null),
	constraint un_nom_module unique(nom_module)
);

create table moduleens(
	code_module varchar(10),
	matricule bigint,
	priorite integer,
	constraint pk_moduleEns primary key(code_module, matricule),
	constraint fk_module foreign key(code_module) references module(code_module) on update cascade on delete cascade,
	constraint fk_personne foreign key(matricule) references personne(matricule) on update cascade on delete cascade,
	constraint nn_priorite check(priorite is not null)
);

create table local(
	code_local varchar(10),
	capacite integer,
	type TypeLocal,
	constraint pk_local primary key(code_local),
	constraint nn_capacite check( capacite is not null ),
	constraint nn_type check( type is not null )
);

create table seance(
	id_seance serial,
	code_module varchar(10),
	code_specialite varchar(10),
	type TypeSeance,
	niveau varchar(10),
	semestre varchar(3),
	constraint pk_seance primary key(id_seance),
	constraint fk_module foreign key(code_module) references module(code_module) on update cascade on delete cascade,
	constraint fk_specialite foreign key(code_specialite) references specialite(code_specialite) on update cascade on delete cascade,
	constraint nn_module check(code_module is not null),
	constraint nn_specialite check(code_specialite is not null),
	constraint nn_type check(type is not null),
	constraint nn_niveau check(niveau is not null),
	constraint nn_semestre check(semestre is not null),
	constraint un_specialite_module_type_niveau_semestre unique(code_specialite, code_module, type, niveau, semestre)
);

create table creneau(
	id_creneau serial,
	debut time,
	fin time,
	jour jour,
	id_emp integer,
	id_seance integer,
	code_local varchar(10),
	constraint pk_creneau primary key(id_creneau),
	constraint fk_emploisdutemps foreign key(id_emp) references emploisdutemps(id_emp) on update cascade on delete cascade,
	constraint fk_seance foreign key(id_seance) references seance(id_seance) on update cascade on delete cascade,
	constraint fk_local foreign key(code_local) references local(code_local) on update cascade on delete cascade,
	constraint nn_debut check(debut is not null),
	constraint nn_fin check(fin is not null),
	constraint nn_jour check(jour is not null),
	constraint nn_emploisdutemps check(id_emp is not null),
	constraint nn_id_seance check(id_seance is not null),
	constraint nn_code_local check(code_local is not null)
);

create table ensetcreneaux(
	matricule bigint,
	id_creneau integer,
	constraint pk_ensetcreneaux primary key(matricule, id_creneau),
	constraint fk_personne foreign key(matricule) references personne(matricule) on update cascade on delete cascade,
	constraint fk_creneau foreign key(id_creneau) references creneau(id_creneau) on update cascade on delete cascade
);












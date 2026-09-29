#!/usr/bin/env node

import { intro, outro, text, select, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import { Command } from 'commander';

const program = new Command();

program
  .name('create-nestquick')
  .description('The ultimate NestJS CLI scaffolding tool')
  .version('0.1.0')
  .parse(process.argv);

async function main() {
  console.log();
  intro(pc.bgCyan(pc.black(' Bienvenue dans Nestquick ! ')));

  const project = await text({
    message: 'Quel est le nom de votre projet ?',
    placeholder: 'mon-super-projet',
    validate(value) {
      if (value.length === 0) return 'Le nom est requis !';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Seuls les lettres minuscules, chiffres et tirets sont autorisés.';
    },
  });

  if (isCancel(project)) {
    cancel('Opération annulée.');
    process.exit(0);
  }

  const database = await select({
    message: 'Quelle base de données souhaitez-vous utiliser ?',
    options: [
      { value: 'postgres', label: 'PostgreSQL', hint: 'Recommande' },
      { value: 'mysql', label: 'MySQL' },
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'none', label: 'Aucune' },
    ],
  });

  if (isCancel(database)) {
    cancel('Operation annulee.');
    process.exit(0);
  }

  let dbUrl: string | symbol = '';

  if (database !== 'none') {
    let placeholder = '';
    if (database === 'postgres') placeholder = 'postgresql://user:password@localhost:5432/mydb';
    else if (database === 'mysql') placeholder = 'mysql://user:password@localhost:3306/mydb';
    else if (database === 'mongodb') placeholder = 'mongodb://localhost:27017/mydb';

    dbUrl = await text({
      message: 'URL de connexion a la base de donnees ?',
      placeholder,
      validate(value) {
        if (value.length === 0) return 'L\'URL de connexion est requise !';
      }
    });

    if (isCancel(dbUrl)) {
      cancel('Operation annulee.');
      process.exit(0);
    }
  }

  // TODO: Logique de generation ici...
  console.log(`\n${pc.green('[OK]')} Creation du projet ${pc.bold(project as string)}... (Simulation)`);
  if (database !== 'none') {
    console.log(`${pc.green('[OK]')} Base de donnees choisie : ${database}`);
    console.log(`${pc.green('[OK]')} Connexion : ${dbUrl}\n`);
  } else {
    console.log(`${pc.green('[OK]')} Base de donnees : Aucune\n`);
  }

  outro(`Projet initialise ! Vous etes pret a coder.`);
}

main().catch(console.error);

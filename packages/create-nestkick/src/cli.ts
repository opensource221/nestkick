#!/usr/bin/env node

import { intro, outro, text, select, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import { Command } from 'commander';

const program = new Command();

program
  .name('create-nestkick')
  .description('The ultimate NestJS CLI scaffolding tool')
  .version('0.1.0')
  .parse(process.argv);

async function main() {
  console.log();
  intro(pc.bgCyan(pc.black(' 🚀 Bienvenue dans Nestkick ! ')));

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
      { value: 'postgres', label: 'PostgreSQL', hint: 'Recommandé' },
      { value: 'mysql', label: 'MySQL' },
      { value: 'none', label: 'Aucune' },
    ],
  });

  if (isCancel(database)) {
    cancel('Opération annulée.');
    process.exit(0);
  }

  // TODO: Logique de génération ici...
  console.log(`\n${pc.green('✔')} Création du projet ${pc.bold(project as string)} avec ${database}... (Simulation)\n`);

  outro(`🎉 Projet initialisé ! Vous êtes prêt à coder.`);
}

main().catch(console.error);

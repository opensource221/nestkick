# Nestquick

## Structure du projet

```text
nestquick/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                        # lint + test + build sur chaque PR
│   │   ├── release.yml                   # publish npm automatique
│   │   └── stale.yml                     # gestion des issues inactives
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── FUNDING.yml                       
│
├── .changeset/                           # versioning & changelog automatisé
│   └── config.json
│
├── .husky/                               # git hooks (commit-msg, pre-commit)
│
├── packages/
│   └── create-nestquick/                  # LE CLI (package npm)
│       ├── src/
│       │   ├── index.ts                  # point d'entrée
│       │   ├── cli.ts                    # config de la commande
│       │   ├── commands/
│       │   │   ├── create.ts             # `npx create-nestquick my-app`
│       │   │   └── list.ts               # lister les templates dispos
│       │   ├── prompts/
│       │   │   ├── project.ts            # nom, description, author
│       │   │   ├── template.ts           # choix du template
│       │   │   └── features.ts           # options : prisma, docker, auth...
│       │   ├── generators/
│       │   │   ├── scaffold.ts           # copie le template
│       │   │   ├── inject-config.ts      # adapte selon les choix
│       │   │   └── git-init.ts           # git init + premier commit
│       │   ├── utils/
│       │   │   ├── logger.ts
│       │   │   ├── pkg-manager.ts        # détecte npm/pnpm/yarn
│       │   │   └── validate.ts
│       │   └── constants/
│       │       ├── templates.ts
│       │       └── versions.ts
│       ├── tests/
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── templates/
│   └── rest-api/                         # le template NestJS
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   │
│       │   ├── config/
│       │   │   ├── configuration.ts
│       │   │   ├── env.validation.ts
│       │   │   └── config.module.ts
│       │   │
│       │   ├── common/
│       │   │   ├── enums/
│       │   │   │   └── role.enum.ts                 # ADMIN, USER
│       │   │   ├── decorators/
│       │   │   │   ├── roles.decorator.ts
│       │   │   │   ├── current-user.decorator.ts
│       │   │   │   └── public.decorator.ts
│       │   │   ├── filters/
│       │   │   │   └── http-exception.filter.ts
│       │   │   ├── guards/
│       │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   └── roles.guard.ts
│       │   │   ├── interceptors/
│       │   │   │   ├── transform.interceptor.ts
│       │   │   │   └── logging.interceptor.ts
│       │   │   ├── pipes/
│       │   │   ├── utils/
│       │   │   │   └── pagination.ts
│       │   │   └── constants/
│       │   │
│       │   ├── infrastructure/           # services techniques
│       │   │   ├── database/
│       │   │   │   ├── database.module.ts
│       │   │   │   ├── prisma.service.ts
│       │   │   │   └── prisma.module.ts
│       │   │   ├── mail/
│       │   │   │   ├── mail.module.ts
│       │   │   │   ├── mail.service.ts
│       │   │   │   ├── interfaces/
│       │   │   │   │   └── mailer.interface.ts
│       │   │   │   ├── providers/
│       │   │   │   │   ├── smtp.mailer.ts
│       │   │   │   └── resend.mailer.ts
│       │   │   │   └── templates/
│       │   │   │       ├── welcome.hbs
│       │   │   │       ├── reset-password.hbs
│       │   │   │       └── layouts/
│       │   │   ├── storage/
│       │   │   │   ├── storage.module.ts
│       │   │   │   ├── storage.service.ts
│       │   │   │   ├── interfaces/
│       │   │   │   │   └── storage.interface.ts
│       │   │   │   ├── providers/
│       │   │   │   │   ├── local.storage.ts
│       │   │   │   └── s3.storage.ts
│       │   │   │   └── dto/
│       │   │   ├── queue/
│       │   │   │   ├── queue.module.ts
│       │   │   │   ├── queue.service.ts
│       │   │   │   ├── processors/
│       │   │   │   │   ├── mail.processor.ts
│       │   │   │   │   └── file-cleanup.processor.ts
│       │   │   │   └── queues/
│       │   │   │       └── queue-names.constant.ts
│       │   │   ├── cache/
│       │   │   │   ├── cache.module.ts
│       │   │   │   └── cache.service.ts
│       │   │   ├── events/              
│       │   │   │   ├── events.module.ts
│       │   │   │   ├── event-bus.service.ts
│       │   │   │   ├── interfaces/
│       │   │   │   │   └── event-handler.interface.ts
│       │   │   │   ├── events/
│       │   │   │   │   └── user-registered.event.ts
│       │   │   │   └── listeners/
│       │   │   │       └── send-welcome-mail.listener.ts
│       │   │   └── notifications/
│       │   │       ├── notifications.module.ts
│       │   │       ├── sms.service.ts
│       │   │       └── push.service.ts
│       │   │
│       │   └── modules/                 # features métier
│       │       ├── auth/
│       │       │   ├── dto/
│       │       │   │   ├── login.dto.ts
│       │       │   │   ├── register.dto.ts
│       │       │   │   └── refresh-token.dto.ts
│       │       │   ├── entities/
│       │       │   │   ├── user.entity.ts
│       │       │   │   └── refresh-token.entity.ts
│       │       │   ├── usecases/
│       │       │   │   ├── login.usecase.ts
│       │       │   │   ├── register.usecase.ts
│       │       │   │   ├── refresh-token.usecase.ts
│       │       │   │   └── logout.usecase.ts
│       │       │   ├── strategies/
│       │       │   │   └── jwt.strategy.ts
│       │       │   ├── auth.controller.ts
│       │       │   └── auth.module.ts
│       │       ├── users/
│       │       │   ├── dto/
│       │       │   ├── entities/
│       │       │   ├── usecases/
│       │       │   │   ├── create-user.usecase.ts
│       │       │   │   ├── find-all-users.usecase.ts
│       │       │   │   ├── find-user-by-id.usecase.ts
│       │       │   │   ├── update-user.usecase.ts
│       │       │   │   └── delete-user.usecase.ts
│       │       │   ├── users.controller.ts
│       │       │   └── users.module.ts
│       │       └── health/
│       │           ├── health.controller.ts
│       │           └── health.module.ts
│       │
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── seed.ts
│       │   └── migrations/
│       ├── test/
│       │   ├── auth.e2e-spec.ts
│       │   ├── users.e2e-spec.ts
│       │   ├── health.e2e-spec.ts
│       │   └── jest-e2e.json
│       ├── .dockerignore
│       ├── .env.example
│       ├── .eslintrc.js
│       ├── .gitignore
│       ├── .prettierrc
│       ├── docker-compose.yml
│       ├── Dockerfile
│       ├── nest-cli.json
│       ├── package.json
│       ├── README.md
│       ├── tsconfig.build.json
│       └── tsconfig.json
│
├── docs/                                 # docs internes et communauté
│   ├── ARCHITECTURE.md
│   ├── TEMPLATE-SPEC.md
│   │   │   └── SECURITY.md
│
├── scripts/
│   ├── release.mjs
│   └── sync-templates.mjs
│
├── .editorconfig
├── .gitignore
├── .nvmrc
├── .prettierrc
├── commitlint.config.js
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md                   
├── CONTRIBUTING.md                      
├── LICENSE                              
├── README.md                            
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

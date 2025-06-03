# Site
Basic site displaying daily summary information

Includes a redis service to avoid excessive calls to apis, as well as some nice generics to aid rapidly adding apis and api hooks

## Setup
Create a `.env` & `.env.dev` file with the env vars specified in [`config.ts`](/site/src/app/config/config.ts)

After configuring any secrets required, run either
```bash
./dev.sh
```
```bash
./prod.sh
```
for dev and prod respectively.

Note: Prod is made for LAN only, and security of this repo should be reviewed if this is not the use case.
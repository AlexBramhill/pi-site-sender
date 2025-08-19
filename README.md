# Pico site sender
Send a screenshot from a website to a Raspberry Pi Pico's display on a schedule -- allowing the best of both the Pico form factor and the versatility of modern web design.

Useful for projects where you're after more complex huds.

See readmes in each service for more information:

- [pico](https://github.com/AlexBramhill/pico-image-fetcher/blob/main/readme.md)

- [screenshot](screenshot/readme.md)

- [site](site/README.md)

## Run all

After configuring any secrets required, run either
```bash
./dev.sh
```
```bash
./prod.sh
```
for dev and prod respectively.

Note: Prod is made for LAN only, and security of this repo should be reviewed if this is not the use case.
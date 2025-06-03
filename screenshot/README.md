# Screenshot

Collection of microservices to return a screenshot of a specified format

General image request to image flow

```
image request
-> backend orchestrator 
---> query validation 
-> screenshot taker
---> take screenshot at desired resolution* ()
-> backend orchestrator 
---> receive and send screenshot
-> screenshot processor
---> downsample & dither image to specified format (ie 1bit, RGB 332)
---> convert to file format in original request
-> backend orchestrator 
---> return image in file format in original request

* there is also support for different image formats, however this is hardcoded as this is rarely needed
```

## Setup

After configuring any secrets required, run either
```bash
./dev.sh
```
```bash
./prod.sh
```
for dev and prod respectively.

Note: Prod is made for LAN only, and security of this repo should be reviewed if this is not the use case.
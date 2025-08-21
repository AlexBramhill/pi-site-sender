# Design Considerations
## Goals
### Must
- [ ] Display a screenshot of a web page.
- [ ] Support existing pico python implementation
- [ ] Support new pico c++ implemention
### Should
- [ ] Support multiple display types
- [ ] Support multple colour profiles
- [ ] Support multiple rotations
### Could
- [ ] Support eink hard/soft refresh
- [ ] Explore maximum speed of refresh (c++ only)
## Main concepts

### 
```mermaid
---
title: Architecture Overview
---
flowchart

subgraph Microcontroller
displayManager[Display Manager]
imageClient[Image Client]
imageClient-- Gives image to -->displayManager
end

subgraph Website Sender Backend
backendOrchestrator[Backend Orchestrator]
screenshotTaker[Screenshot Taker]
imageProcessor[Image Processor]

backendOrchestrator-- Requests image from -->screenshotTaker
backendOrchestrator-- Requests image processed -->imageProcessor
end

subgraph Website
website[Website]
end

imageClient-- Requests image from -->backendOrchestrator
screenshotTaker-- Takes screenshot from-->website
```
## Key decisions
### Single configuration vs sharing configuration
The question whether to split the configuration between the backend services and the picos, and if so, by how much is a core decision of this project.
#### Initial implementaiton
Initial implementaiton sees us have a simple process where the microcontroller knew everything about the display, as well as the configuration of the image it wants such as the width, height, colour profile, rotation and file format (note -- the rotation is required as several eink screens do not handle rotation well at all - slowing down refresh speed massively).

```mermaid
---
title: Initial implementation
---
flowchart
website[Website]

subgraph Microcontroller
microcontrollerConfig[Config]
client[Client]
microcontrollerConfig -- width<br>height<br>colourProfile<br>rotation<br>imageFormat --> client
end

subgraph Agnostic Screenshot Backend
screenshotBackend[Screenshot service]
backendConfig[Config]
backendConfig--Website Address*-->screenshotBackend
end


client -- width<br>height<br>colourProfile<br>rotation<br>imageFormat -->  screenshotBackend -- GET Website Address --> website
```
*note: website address could also be stored in the micro controller config

This allows for the remainder of the backend to be agnostic of displays -- it simply needs to know about the image, and nothing about the screen.

#### The argument towards sharing knowledge of the display configuration

This configuration has a downside however -- We cannot control the rotation, colour profile, image format or display type for each microcontroller without manually plugging them in and updating each configuration.

Through having the configuration living on the backend service, we can control these configurations quickly through a web accessible UI.

It further allows us to extend this configuration, and does a lot of work towards allowing each microcontroller to hit other websites.

```mermaid
---
title: Shared configuration implementation
---
flowchart
website[Website]

subgraph Microcontroller
microcontrollerConfig[Config]
client[Client]
microcontrollerConfig -- Microcontroller name --> client
end

subgraph Agnostic Screenshot Backend
screenshotBackend[Screenshot service]
backendConfig[Config]
backendConfig--Website Address<br>width<br>height<br>colourProfile<br>rotation<br>imageFormat-->screenshotBackend
end


client -- Microcontroller name --> backendConfig
screenshotBackend -- GET Website Address --> website
```
However, when looking at the sequencing, we see a problem, especially if targetting low latency. That is that the lookups may be too time-costly to run each time.

```mermaid
---
title: Sequence Diagram (Shared Display Knowledge)
---
sequenceDiagram

box Microcontroller
participant Microcontroller
end

box Backend Service
participant Backend Orchestrator
participant Microcontroller Configuration Service
participant Image Processor
participant Screenshot Taker
end

box Website
participant Website
end
Microcontroller ->> Backend Orchestrator: GET /{MicrocontrollerName}

Backend Orchestrator ->> Microcontroller Configuration Service: GET /{MicrocontrollerName}
Microcontroller Configuration Service ->> Backend Orchestrator: Microcontroller configuration
Backend Orchestrator ->> Screenshot Taker: GET /?height={HEIGHT}&width{WIDTH}
Screenshot Taker ->> Website: GET /{WEBSITE_URL}
Website ->> Screenshot Taker: Webpage
Screenshot Taker ->> Backend Orchestrator: Webpage screenshot
Backend Orchestrator ->> Image Processor: GET /?rotation={ROTATION}&colourProfile{COLOUR_PROFILE}&fileFormat{FILE_FORMAT} and Webpage screenshot
Image Processor ->> Backend Orchestrator: Processed image
Backend Orchestrator ->> Microcontroller: Processed image
```
#### The hybrid approach

```mermaid
---
title: Sequence Diagram (Hybrid)
---
sequenceDiagram

box Microcontroller
participant Microcontroller
end

box Backend Service
participant Backend Orchestrator
participant Redis
participant Microcontroller Configuration Service
participant Image Processor
participant Screenshot Taker
end

box Website
participant Website
end

Microcontroller ->> Backend Orchestrator: GET /{MicrocontrollerName}/config
Backend Orchestrator ->> Microcontroller Configuration Service: GET /{MicrocontrollerName}
Microcontroller Configuration Service ->>+ Backend Orchestrator: Microcontroller configuration (display type)
Backend Orchestrator ->>Redis: Microcontroller configuration (keyed by display type)
Backend Orchestrator ->>- Microcontroller: Microcontroller configuration (display type)
Microcontroller ->> Microcontroller: Initalise display driver

Microcontroller ->> Backend Orchestrator: GET /{MicrocontrollerName}/image
Backend Orchestrator ->> Redis: Get config

alt Config missing
Redis ->> Backend Orchestrator: Missing config
Backend Orchestrator ->> Microcontroller: 404: Cache miss
Microcontroller ->> Microcontroller: Trigger config reset
end
Redis ->> Backend Orchestrator: Config
par Check cache validity
Backend Orchestrator ->> Microcontroller Configuration Service: Get Saved Config
Microcontroller Configuration Service ->> Backend Orchestrator: Saved Config
Backend Orchestrator ->> Backend Orchestrator: Check configs match
alt Config mismatch
Backend Orchestrator ->> Microcontroller: 404: Update required
Microcontroller ->> Microcontroller: Trigger config reset
end
alt Config missing
Backend Orchestrator ->> Microcontroller: 404: Missing config
Microcontroller ->> Microcontroller: Trigger config reset
end
and Get screenshot
Backend Orchestrator ->> Screenshot Taker: GET screenshot
Screenshot Taker ->> Website: GET
Website ->> Screenshot Taker: Webpage
Screenshot Taker ->> Backend Orchestrator: Webpage screenshot
Backend Orchestrator ->> Image Processor: Process image
Image Processor ->> Backend Orchestrator: Processed image
Backend Orchestrator ->> Microcontroller: Processed image
Microcontroller ->> Microcontroller: Update image
end

```
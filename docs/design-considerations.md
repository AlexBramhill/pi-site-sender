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
## Sequence diagrams -- Key decisions
There is currently reworking of the general architecture occuring prior to becoming too entrenched in a solution.


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
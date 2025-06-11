import { DateTransformer } from "@/app/transformers.ts/date-transformer";
import { z } from "zod";
import { InstructionSchema } from "./instruction";
import { ObstacleSchema } from "./obstacle";
import { stopPointSchema } from "./stop-point";

export const LegSchema = z.object({
  duration: z.number(),
  speed: z.string(),
  instruction: InstructionSchema,
  obstacles: z.array(ObstacleSchema),
  departureTime: DateTransformer,
  arrivalTime: DateTransformer,
  departurePoint: stopPointSchema,
  arrivalPoint: stopPointSchema,
  path: {
    lineString: z.string(),
    stopPoints: [
      {
        id: z.string(),
        name: z.string(),
        uri: z.string(),
        fullName: z.string(),
        type: z.string(),
        crowding: {
          passengerFlows: [
            {
              timeSlice: z.string(),
              value: z.number(),
            },
          ],
          trainLoadings: [
            {
              line: z.string(),
              lineDirection: z.string(),
              platformDirection: z.string(),
              direction: z.string(),
              naptanTo: z.string(),
              timeSlice: z.string(),
              value: z.number(),
            },
          ],
        },
        routeType: z.string(),
        status: z.string(),
        motType: z.string(),
        network: z.string(),
      },
    ],
    elevation: [
      {
        distance: z.number(),
        startLat: z.number(),
        startLon: z.number(),
        endLat: z.number(),
        endLon: z.number(),
        heightFromPreviousPoint: z.number(),
        gradient: z.number(),
      },
    ],
  },
  routeOptions: [
    {
      id: z.string(),
      name: z.string(),
      directions: [z.string()],
      lineIdentifier: {
        id: z.string(),
        name: z.string(),
        uri: z.string(),
        fullName: z.string(),
        type: z.string(),
        crowding: {
          passengerFlows: [
            {
              timeSlice: z.string(),
              value: z.number(),
            },
          ],
          trainLoadings: [
            {
              line: z.string(),
              lineDirection: z.string(),
              platformDirection: z.string(),
              direction: z.string(),
              naptanTo: z.string(),
              timeSlice: z.string(),
              value: z.number(),
            },
          ],
        },
        routeType: z.string(),
        status: z.string(),
        motType: z.string(),
        network: z.string(),
      },
      direction: z.string(),
    },
  ],
  mode: {
    id: z.string(),
    name: z.string(),
    uri: z.string(),
    fullName: z.string(),
    type: z.string(),
    crowding: {
      passengerFlows: [
        {
          timeSlice: z.string(),
          value: z.number(),
        },
      ],
      trainLoadings: [
        {
          line: z.string(),
          lineDirection: z.string(),
          platformDirection: z.string(),
          direction: z.string(),
          naptanTo: z.string(),
          timeSlice: z.string(),
          value: z.number(),
        },
      ],
    },
    routeType: z.string(),
    status: z.string(),
    motType: z.string(),
    network: z.string(),
  },
  disruptions: [
    {
      category: z.string(),
      type: z.string(),
      categoryDescription: z.string(),
      description: z.string(),
      summary: z.string(),
      additionalInfo: z.string(),
      created: DateTransformer,
      lastUpdate: DateTransformer,
      affectedRoutes: [
        {
          id: z.string(),
          lineId: z.string(),
          routeCode: z.string(),
          name: z.string(),
          lineString: z.string(),
          direction: z.string(),
          originationName: z.string(),
          destinationName: z.string(),
          via: {
            ordinal: z.number(),
            stopPoint: {
              naptanId: z.string(),
              platformName: z.string(),
              indicator: z.string(),
              stopLetter: z.string(),
              modes: [z.string()],
              icsCode: z.string(),
              smsCode: z.string(),
              stopType: z.string(),
              stationNaptan: z.string(),
              accessibilitySummary: z.string(),
              hubNaptanCode: z.string(),
              lines: [
                {
                  id: z.string(),
                  name: z.string(),
                  uri: z.string(),
                  fullName: z.string(),
                  type: z.string(),
                  crowding: {
                    passengerFlows: [
                      {
                        timeSlice: z.string(),
                        value: z.number(),
                      },
                    ],
                    trainLoadings: [
                      {
                        line: z.string(),
                        lineDirection: z.string(),
                        platformDirection: z.string(),
                        direction: z.string(),
                        naptanTo: z.string(),
                        timeSlice: z.string(),
                        value: z.number(),
                      },
                    ],
                  },
                  routeType: z.string(),
                  status: z.string(),
                  motType: z.string(),
                  network: z.string(),
                },
              ],
              lineGroup: [
                {
                  naptanIdReference: z.string(),
                  stationAtcoCode: z.string(),
                  lineIdentifier: [z.string()],
                },
              ],
              lineModeGroups: [
                {
                  modeName: z.string(),
                  lineIdentifier: [z.string()],
                },
              ],
              fullName: z.string(),
              naptanMode: z.string(),
              status: z.boolean(),
              individualStopId: z.string(),
              id: z.string(),
              url: z.string(),
              commonName: z.string(),
              distance: z.number(),
              placeType: z.string(),
              additionalProperties: [
                {
                  category: z.string(),
                  key: z.string(),
                  sourceSystemKey: z.string(),
                  value: z.string(),
                  modified: DateTransformer,
                },
              ],
              children: [
                {
                  id: z.string(),
                  url: z.string(),
                  commonName: z.string(),
                  distance: z.number(),
                  placeType: z.string(),
                  additionalProperties: [
                    {
                      category: z.string(),
                      key: z.string(),
                      sourceSystemKey: z.string(),
                      value: z.string(),
                      modified: DateTransformer,
                    },
                  ],
                  children: [{}],
                  childrenUrls: [z.string()],
                  lat: z.number(),
                  lon: z.number(),
                },
              ],
              childrenUrls: [z.string()],
              lat: z.number(),
              lon: z.number(),
            },
          },
          isEntireRouteSection: z.boolean(),
          validTo: DateTransformer,
          validFrom: DateTransformer,
          routeSectionNaptanEntrySequence: [
            {
              ordinal: z.number(),
              stopPoint: {
                naptanId: z.string(),
                platformName: z.string(),
                indicator: z.string(),
                stopLetter: z.string(),
                modes: [z.string()],
                icsCode: z.string(),
                smsCode: z.string(),
                stopType: z.string(),
                stationNaptan: z.string(),
                accessibilitySummary: z.string(),
                hubNaptanCode: z.string(),
                lines: [
                  {
                    id: z.string(),
                    name: z.string(),
                    uri: z.string(),
                    fullName: z.string(),
                    type: z.string(),
                    crowding: {
                      passengerFlows: [
                        {
                          timeSlice: z.string(),
                          value: z.number(),
                        },
                      ],
                      trainLoadings: [
                        {
                          line: z.string(),
                          lineDirection: z.string(),
                          platformDirection: z.string(),
                          direction: z.string(),
                          naptanTo: z.string(),
                          timeSlice: z.string(),
                          value: z.number(),
                        },
                      ],
                    },
                    routeType: z.string(),
                    status: z.string(),
                    motType: z.string(),
                    network: z.string(),
                  },
                ],
                lineGroup: [
                  {
                    naptanIdReference: z.string(),
                    stationAtcoCode: z.string(),
                    lineIdentifier: [z.string()],
                  },
                ],
                lineModeGroups: [
                  {
                    modeName: z.string(),
                    lineIdentifier: [z.string()],
                  },
                ],
                fullName: z.string(),
                naptanMode: z.string(),
                status: z.boolean(),
                individualStopId: z.string(),
                id: z.string(),
                url: z.string(),
                commonName: z.string(),
                distance: z.number(),
                placeType: z.string(),
                additionalProperties: [
                  {
                    category: z.string(),
                    key: z.string(),
                    sourceSystemKey: z.string(),
                    value: z.string(),
                    modified: DateTransformer,
                  },
                ],
                children: [
                  {
                    id: z.string(),
                    url: z.string(),
                    commonName: z.string(),
                    distance: z.number(),
                    placeType: z.string(),
                    additionalProperties: [
                      {
                        category: z.string(),
                        key: z.string(),
                        sourceSystemKey: z.string(),
                        value: z.string(),
                        modified: DateTransformer,
                      },
                    ],
                    children: [{}],
                    childrenUrls: [z.string()],
                    lat: z.number(),
                    lon: z.number(),
                  },
                ],
                childrenUrls: [z.string()],
                lat: z.number(),
                lon: z.number(),
              },
            },
          ],
        },
      ],
      affectedStops: [
        {
          naptanId: z.string(),
          platformName: z.string(),
          indicator: z.string(),
          stopLetter: z.string(),
          modes: [z.string()],
          icsCode: z.string(),
          smsCode: z.string(),
          stopType: z.string(),
          stationNaptan: z.string(),
          accessibilitySummary: z.string(),
          hubNaptanCode: z.string(),
          lines: [
            {
              id: z.string(),
              name: z.string(),
              uri: z.string(),
              fullName: z.string(),
              type: z.string(),
              crowding: {
                passengerFlows: [
                  {
                    timeSlice: z.string(),
                    value: z.number(),
                  },
                ],
                trainLoadings: [
                  {
                    line: z.string(),
                    lineDirection: z.string(),
                    platformDirection: z.string(),
                    direction: z.string(),
                    naptanTo: z.string(),
                    timeSlice: z.string(),
                    value: z.number(),
                  },
                ],
              },
              routeType: z.string(),
              status: z.string(),
              motType: z.string(),
              network: z.string(),
            },
          ],
          lineGroup: [
            {
              naptanIdReference: z.string(),
              stationAtcoCode: z.string(),
              lineIdentifier: [z.string()],
            },
          ],
          lineModeGroups: [
            {
              modeName: z.string(),
              lineIdentifier: [z.string()],
            },
          ],
          fullName: z.string(),
          naptanMode: z.string(),
          status: z.boolean(),
          individualStopId: z.string(),
          id: z.string(),
          url: z.string(),
          commonName: z.string(),
          distance: z.number(),
          placeType: z.string(),
          additionalProperties: [
            {
              category: z.string(),
              key: z.string(),
              sourceSystemKey: z.string(),
              value: z.string(),
              modified: DateTransformer,
            },
          ],
          children: [
            {
              id: z.string(),
              url: z.string(),
              commonName: z.string(),
              distance: z.number(),
              placeType: z.string(),
              additionalProperties: [
                {
                  category: z.string(),
                  key: z.string(),
                  sourceSystemKey: z.string(),
                  value: z.string(),
                  modified: DateTransformer,
                },
              ],
              children: [{}],
              childrenUrls: [z.string()],
              lat: z.number(),
              lon: z.number(),
            },
          ],
          childrenUrls: [z.string()],
          lat: z.number(),
          lon: z.number(),
        },
      ],
      closureText: z.string(),
    },
  ],
  plannedWorks: [
    {
      id: z.string(),
      description: z.string(),
      createdDateTime: DateTransformer,
      lastUpdateDateTime: DateTransformer,
    },
  ],
  distance: z.number(),
  isDisrupted: z.boolean(),
  hasFixedLocations: z.boolean(),
  scheduledDepartureTime: DateTransformer,
  scheduledArrivalTime: DateTransformer,
  interChangeDuration: z.string(),
  interChangePosition: z.string(),
});

export type Leg = z.infer<typeof LegSchema>;

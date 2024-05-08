// Import modules
import axios from "axios";

// Load test data
// import localData from "./data/records.json";

/**
 * Calculate the average balance of the records.
 *
 * Task: This seems pretty straightforward but could it be improved? Maybe
 * more declarative?
 *
 * @param localData array of objects
 * @returns number
 */
export function calculateAvgBalance(localData: Array<SampleDateRecord>): number {
  let total = 0;

  for (let i = 0; i < localData.length; i++) {
    const value = Number((localData[i].balance as string).replace(/[^0-9.-]+/g, ""));
    total += value;
  }

  return total / localData.length;
}

/**
 * Count the tags and organize them into an array of objects.
 *
 * Task: That's a lot of loops. The test is also failing for some reason 🤦.
 *
 * @param localData array of objects
 * @returns array of objects
 */
export function findTagCounts(localData: Array<SampleDateRecord>): Array<TagCounts> {
  const tagCounts: Array<TagCounts> = [];

  for (let i = 0; i < localData.length; i++) {
    const tags = localData[i].tags;

    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];

      for (let k = 0; k < tagCounts.length; k++) {
        if (tagCounts[k].tag === tag) {
          tagCounts[k].count++;
        } else {
          tagCounts.push({ tag, count: 1 });
        }
      }
    }
  }

  return tagCounts;
}

/**
 * Get site titles of cool websites.
 *
 * Task: Can we change this to make the requests async so they
 * are all fetched at once, then, when they are done, return all the
 * titles?
 *
 * @returns array of strings
 */
export async function returnSiteTitles(): Promise<string[]> {
  const urls = ["https://www.google.com/", "https://www.startrek.com/", "https://bwfbadminton.com/"];

  const titles = [];

  for (const url of urls) {
    const response = await axios.get(url);

    if (response.status === 200) {
      const match = response.data.match(/<title>(.*?)<\/title>/);
      titles.push(match[1]);
    }
  }

  return titles;
}

/**
 * Reformat and validate some of the fields into proper types.
 *
 * Task: This seems a bit verbose. Add proper validation where
 * the comments suggest it. Feel free to modify anything
 * TypeScript-related if you need to 😉. External libraries
 * are fine to use. Could more native language features be
 * used to make it cleaner?
 *
 * @param localData array of objects
 * @returns array of objects
 */
export function reformatData(localData: Array<SampleDateRecord>): Array<SampleDateRecord> {
  const reformattedData: Array<SampleDateRecord> = [];

  for (let i = 0; i < localData.length; i++) {
    const record = localData[i];

    reformattedData.push({
      _id: record._id,
      index: record.index,
      guid: record.guid,
      isActive: record.isActive,
      // Convert this from a string to a float/number
      balance: record.balance,
      // Validate this is a valid URL. Insert null if invalid.
      picture: record.picture,
      age: record.age,
      eyeColor: record.eyeColor,
      name: record.name,
      gender: record.gender,
      company: record.company,
      // Validate the email format. Insert null if invalid.
      email: record.email,
      // Reformat the phone to be period-separated so 1.555.555.5555.
      phone: record.phone,
      address: record.address,
      about: record.about,
      // Reformat the date to be ISO 8601 in UTC time (i.e. 2021-06-17T02:28:41.000Z).
      registered: record.registered,
      latitude: record.latitude,
      longitude: record.longitude,
      tags: record.tags,
      friends: record.friends
    });
  }

  return reformattedData;
}

/**
 * Build out a HTML <ul> list of names.
 *
 * Task: Can you make this more concise, less error-prone, and more declarative?
 *
 * @param localData array of objects
 * @returns string
 */
export function buildAList(localData: Array<SampleDateRecord>): string {
  let list = "<ul>";

  for (let i = 0; i < localData.length; i++) {
    const record = localData[i];
    list += `<li>${record.name}</li>`;
  }

  list += "</ul>";

  return list;
}

/**
 * Filter the data by age with an optional limit.
 *
 * Task: The code looks a little smelly to me. Can you make it cleaner and
 * easier to follow? Bonus points for a more declarative approach.
 *
 * @param localData array of objects
 * @param age number
 * @param count number
 * @returns array of objects
 */
export function filterAgeGreaterThan(
  localData: Array<SampleDateRecord>,
  age: number,
  count = 0
): Array<SampleDateRecord> {
  const filteredData: Array<SampleDateRecord> = [];

  for (let i = 0; i < localData.length; i++) {
    const record = localData[i];

    if (record.isActive && record.age > age) {
      if (count) {
        if (filteredData.length < count) {
          filteredData.push(record);
        }
      } else {
        filteredData.push(record);
      }
    }
  }

  return filteredData;
}

/**
 * A random function that does a number of things for Twilio Flex.
 *
 * Task: Don't worry about what this function is doing. There is no test
 * for this to pass. Rather, your task here is to simply try to improve on
 * the code that is here. Can you make it more concise and readable? Should
 * anything be added, abstracted, or removed?
 *
 * @param flex Flex object
 * @param manager manager object
 */
export function doALotOfStuff(flex: any, manager: any): void {
  /**
   * Variable to save the current worker
   */
  const currentWorker = manager.workerClient.sid;

  // Ignore this function.
  function displayContainer(value: string): void {
    console.log(value);
  }

  manager.insightsClient
    .liveQuery("tr-task", `data.worker_sid == "${currentWorker}"`)
    .then((args: Record<string, any>) => {
      const otherTask = new Map();
      const assignedTask = new Map();
      const items = args.getItems();
      Object.entries<any>(items).forEach(([key, value]) => {
        if (value.status === "assigned") {
          otherTask.delete(key);
          assignedTask.set(key, value);
        } else if (value.status === "wrapping") {
          assignedTask.set(key, value);
          otherTask.delete(key);
        } else {
          otherTask.set(key, value);
        }
      });

      if (assignedTask.size === 1 && otherTask.size === 0) {
        displayContainer("none");
        flex.Actions.invokeAction(
          "HistoryPush",
          "/agent-desktop/" + Array.from(manager.workerClient.reservations.keys())[0]
        );
      } else {
        displayContainer("block");
      }

      manager.events.addListener("selectedViewChanged", (viewName: string) => {
        if (viewName === "agent-desktop" && assignedTask.size === 1 && otherTask.size === 0) {
          displayContainer("none");
          flex.Actions.invokeAction(
            "HistoryPush",
            "/agent-desktop/" + Array.from(manager.workerClient.reservations.keys())[0]
          );
        }
      });

      args.on("itemUpdated", (args: any) => {
        if (args.value.status === "assigned") {
          otherTask.delete(args.key);
          assignedTask.set(args.key, args.value);
        } else if (args.value.status === "wrapping") {
          otherTask.delete(args.key);
        } else {
          otherTask.set(args.key, args.value);
        }

        if (assignedTask.size === 1 && otherTask.size === 0 && window.location.href.includes("agent-desktop")) {
          displayContainer("none");
          flex.Actions.invokeAction(
            "HistoryPush",
            "/agent-desktop/" + Array.from(manager.workerClient.reservations.keys())[0]
          );
        } else {
          displayContainer("block");
        }
      });

      args.on("itemRemoved", (args: any) => {
        otherTask.delete(args.key);
        assignedTask.delete(args.key);
        if (assignedTask.size === 1 && otherTask.size === 0) {
          displayContainer("none");
          flex.Actions.invokeAction(
            "HistoryPush",
            "/agent-desktop/" + Array.from(manager.workerClient.reservations.keys())[0]
          );
        } else {
          displayContainer("block");
        }
      });
    });
}

/* eslint-disable */
// (async ()=>{
//   console.log(
//     calculateAvgBalance(localData),
//     findTagCounts(localData),
//     await returnSiteTitles(),
//     reformatData(localData),
//     buildAList(localData)
//   );
// })();
import * as testFunctions from "./index";
import localData from "./data/records.json";

describe("Test calculateAvgBalance", () => {
  it("should average the balance fields", () => {
    expect(testFunctions.calculateAvgBalance(localData)).toBe(2464.9111538461543);
  });
});

describe("Test findTagCounts", () => {
  it("should count the correct number of tag occurrences", () => {
    const tagCounts = testFunctions.findTagCounts(localData);

    expect(tagCounts.length).toBe(62);

    const test1 = tagCounts.find((tagCount) => tagCount.tag === "occaecat");
    const test2 = tagCounts.find((tagCount) => tagCount.tag === "cupidatat");
    const test3 = tagCounts.find((tagCount) => tagCount.tag === "velit");

    expect((test1 as TagCounts).count).toBe(6);
    expect((test2 as TagCounts).count).toBe(5);
    expect((test3 as TagCounts).count).toBe(1);
  });
});

describe("Test returnSiteTitles", () => {
  it("should return the proper site titles", async () => {
    const titles = await testFunctions.returnSiteTitles();

    expect(titles.length).toBe(3);

    expect(titles[0]).toBe("Google");
    expect(titles[1]).toBe("Star Trek | Official Site");
    expect(titles[2]).toBe("BWF Fansite");
  });
});

describe("Test reformatData", () => {
  it("should format data correctly.", () => {
    const data = testFunctions.reformatData(localData);

    // Spot check values
    // Balance
    expect(data[5].balance).toBe(3405.08);
    expect(data[14].balance).toBe(3344);
    expect(data[24].balance).toBe(2010.69);

    // Picture
    expect(data[11].picture).toBeNull();
    expect(data[19].picture).toBe("http://placehold.it/32x32");
    expect(data[25].picture).toBeNull();

    // Email
    expect(data[8].email).toBeNull();
    expect(data[17].email).toBeNull();
    expect(data[10].email).toBe("olsonford@kidgrease.com");
    expect(data[18].email).toBe("molinacochran@buzzworks.com");

    // Phone
    expect(data[21].phone).toBe("1.994.440.2209");
    expect(data[3].phone).toBe("1.823.585.2995");

    // Registered
    expect(data[3].registered).toBe("2015-06-05T22:41:36.000Z");
    expect(data[21].registered).toBe("2019-09-15T03:41:09.000Z");
    expect(data[16].registered).toBe("2016-01-06T21:43:57.000Z");
  });
});

describe("Test buildAList", () => {
  it("should build a ul list of names", () => {
    const list = testFunctions.buildAList(localData);

    expect(list).toBe(
      "<ul><li>Garcia Oconnor</li><li>Hughes Riggs</li><li>Cash Phelps</li><li>Anthony Burris</li><li>Holmes Blackwell</li><li>Burris Haley</li><li>Parsons Tyson</li><li>Rae Evans</li><li>Burnett Odonnell</li><li>Wendi Harris</li><li>Olson Ford</li><li>Albert Boone</li><li>English Vega</li><li>Meyers Walsh</li><li>Guzman Olsen</li><li>Hazel Navarro</li><li>Mai Dominguez</li><li>Stark Landry</li><li>Molina Cochran</li><li>Stacie Glenn</li><li>Ofelia Rich</li><li>Jerry Hickman</li><li>Hampton Beasley</li><li>Jerri Goodman</li><li>Savannah Bishop</li><li>Lorrie Holt</li></ul>"
    );
  });
});

describe("Test filterAgeGreaterThan", () => {
  it("should only return records where age is greater than parameter", () => {
    const filteredData1 = testFunctions.filterAgeGreaterThan(localData, 30);
    expect(filteredData1.length).toBe(7);

    const filteredData2 = testFunctions.filterAgeGreaterThan(localData, 30, 2);
    expect(filteredData2.length).toBe(2);
  });
});

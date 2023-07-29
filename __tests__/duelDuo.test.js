const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  //   Check that clicking the Draw button displays the div with id = “choices”
  test("Draw button displays the div with id= choices", async () => {
  await driver.get("http://localhost:8000");

  // Find the Draw button and click it
  await driver.findElement(By.css('#draw')).click();

    // Check if the div with id "choices" is now visible/displayed
    const choicesDiv = await driver.findElement(By.id("choices"));
    const isDisplayed = await choicesDiv.isDisplayed();
    expect(isDisplayed).toBe(true);

  
  });

  // Check that clicking an “Add to Duo” button displays the div with id = “player-duo”

  test("Clicking on Add to Duo button displays the div with id= player-duo", async () => {
  
    await driver.get("http://localhost:8000");
    //click the draw button to display add to Duo btn
    await driver.findElement(By.css('#draw')).click();

    // Find the add to duo button and click it
    await driver.findElement(By.xpath("//*[text()='Add to Duo']")).click();

      // Check if the div with id "choices" is now visible/displayed
      const playerDuo = await driver.findElement(By.css("#player-duo"));
      const isDisplayed = await playerDuo.isDisplayed();
      expect(isDisplayed).toBe(true);

  });

  // Check that when a bot is “Removed from Duo”, that it goes back to “choices”
  // we will compare the initial bot elements in the choices with the elements after the bot is removed and added back. We will also check the length of the elements array before removing and after its added back.
  test("when a bot is “Removed from Duo”, it goes back to “choices”", async () => {
    await driver.get("http://localhost:8000");
    //click the draw button to display add to Duo btn
    await driver.findElement(By.css('#draw')).click();
    // Get the list of all bots currently present in the "choices" div
    const choicesDiv = await driver.findElement(By.id("choices"));
    const initialBotLen = await choicesDiv
                        .findElements(By.xpath("//button[text()='Add to Duo']"));
    console.log("initialBotLen  "+initialBotLen.length); 

    // Find the add to duo button and click it so we can have remove btn displayed
    await driver.findElement(By.xpath("//*[text()='Add to Duo']")).click();

    let updatedChoicesBots = await choicesDiv.findElements(By.xpath("//button[text()='Add to Duo']"));
    console.log("length after adding to player duo  "+updatedChoicesBots.length) // choice bots length should be reduced by 1

    // Find the remove button and click it 
    await driver.findElement(By.xpath("//*[text()='Remove from Duo']")).click();

    updatedChoicesBots = await choicesDiv.findElements(By.xpath("//button[text()='Add to Duo']"));
    console.log("updatedLen "+updatedChoicesBots.length);

    //check to see if the length of the choices elements array is the same before and after, add/remove button was clicked
    expect(initialBotLen.length).toEqual(updatedChoicesBots.length);

    //check to see if choices elements array is the same before and after, add/remove button was clicked
    expect(initialBotLen).toEqual(updatedChoicesBots);
    })





})
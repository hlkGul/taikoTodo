/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    button,
    below,
    click,
    checkBox,
    hover,
    toLeftOf,
    toRightOf,
    text,
    into,
    textBox,
    evaluate,
    $,
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});



step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("http://todomvc.com/examples/vue/");
});


step("Check <todo> is exist", async(todo)=>{
    assert.ok(await text(todo).exists());

});
step("Click check box near to <item>",async(item)=>{
    await click(checkBox(toLeftOf(item)));
})
step("To do <todo> is checked",async(todo)=>{
    assert.ok(await checkBox(toLeftOf(todo)).isChecked());

})
step("To do <todo> is undone",async(todo)=>{
    //class:todo oldugunda yapilan kontrol
    assert.ok(await $(`//li[@class='todo']//div[@class='view']/label[text()='${todo}']`).exists())
})

step("Delete <item> in to do list",async(item)=>{
    await hover(checkBox(toLeftOf(item)));
    await click(button(toRightOf(item)));
    //kaldirinca "display:none" uzerinden kontrol
    await assert.ok(await text(item).isDisabled);
})

step("Check <todo> is added under the <given> todo", async function(todo,given){
    assert.ok(text(todo,below(given)).exists());
});


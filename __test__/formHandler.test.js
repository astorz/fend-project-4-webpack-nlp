import { handleSubmit } from "../src/client/js/formHandler"


describe("Testing the submit functionality", ()=>{
    test("Testing the handleSubmit() function",()=>{
        expect(handleSubmit).toBeDefined();
    })
});

import { polarity } from "../src/client/js/formHandler"

describe("Testing the polarity functionality", ()=>{
    test("Testing polarity()", () => {
        expect(polarity("N")).toEqual("negative");
        expect(polarity("NEU")).toEqual("neutral");
        expect(polarity("X")).toBeUndefined();
    });
});
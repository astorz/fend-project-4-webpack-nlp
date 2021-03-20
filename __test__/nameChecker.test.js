import { validURL } from "../src/client/js/nameChecker"

describe("Testing the nameChecker functionality", ()=>{
    test("Testing the validURL() function",()=>{
        expect(validURL('www.nytimes.com')).toBeTruthy();
        expect(validURL('')).toBeFalsy();
        expect(validURL('https://google.com')).toBeTruthy();
        expect(validURL('htt://google.com')).toBeFalsy();
    })
});
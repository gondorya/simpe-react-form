import {like, longerThan, notLongerThan, notBlank, alphaNum, ascii, is, validate} from "./validators"

test("like - checks if the text matches the pattern", () => {
    expect(like(/^[a-z0-9]+$/i)("text")).toBeTruthy();
    expect(like(/^[a-z0-9]+$/i)("%tex^t")).toBeFalsy();
});

test("longerThan - checks if text is longer then given number", () => {
    expect(longerThan(6)("Very long text")).toBeTruthy();
    expect(longerThan(6)("Text")).toBeFalsy()

});

test("notLongerThan - checks if text is not longer then given number", () => {
    expect(notLongerThan(6)("Very long text")).toBeFalsy();
    expect(notLongerThan(6)("Text")).toBeTruthy()
});

test("notBlank - checks if text is not blank", () => {
    expect(notBlank()("Text")).toBeTruthy();
    expect(notBlank()("")).toBeFalsy();
    expect(notBlank()("       ")).toBeFalsy();
});

test("alphaNum - checks if text contains only letters and numbers", () => {
    expect(alphaNum()("Simpl3T3xt")).toBeTruthy();
    expect(alphaNum()("Simpl3 T3xt^")).toBeFalsy()
});

test("ascii - checks if text contains only American Standard Code", () => {
    expect(ascii()("hello!")).toBeTruthy();
    expect(ascii()("Poznań")).toBeFalsy()
});

test("is - should return a function (validator)", () => {
    const check = jest.fn();
    expect(is(check, "Hello!")).toEqual(expect.any(Function))
})

test("is - should pass value to predicate", () => {
    const predicateMock = jest.fn();
    const validator = is(predicateMock, "Hello!");

    validator("Hello!");

    expect(predicateMock).toHaveBeenCalledWith("Hello!");
});

test("is - returns validation message if predicate fail", () => {
    const predicateMock = () => false;
    const validator = is(predicateMock, "Hello!");

    expect(validator("test")).toBe("Hello!")
});

test("is - returns empty string if predicate pass", () => {
    const predicateMock = () => true;
    const validator = is(predicateMock, "Hello!");

    expect(validator("test")).toBe("")
});

test("validate - calls all validators if all returns empty string", () => {
    const func1 = jest.fn((v: string) => "");
    const func2 = jest.fn((v: string) => "");
    const func3 = jest.fn((v: string) => "");

    validate("text", func1, func2, func3)

    expect(func1).toHaveBeenCalledWith("text");
    expect(func2).toHaveBeenCalledWith("text")
    expect(func3).toHaveBeenCalledWith("text")
});

test("validate - doesn't call call validator if previous one return text", () => {
    const func1 = jest.fn((v: string) => "");
    const func2 = jest.fn((v: string) => "Hello!");
    const func3 = jest.fn((v: string) => "");

    validate("text", func1, func2, func3)

    expect(func1).toHaveBeenCalledWith("text");
    expect(func2).toHaveBeenCalledWith("text")
    expect(func3).not.toHaveBeenCalled()
});

test("validate - returns message from failed test", () => {
    const func1 = jest.fn((v: string) => "");
    const func2 = jest.fn((v: string) => "Hello!");
    const func3 = jest.fn((v: string) => "Bye!");

    expect(validate("text", func1, func2, func3)).toBe("Hello!")
})
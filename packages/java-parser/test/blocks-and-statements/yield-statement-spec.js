"use strict";

const { expect } = require("chai");
const javaParser = require("../../src/index");

describe("The Java Parser fixed bugs", () => {
  it("should handle yield as a special keyword", () => {
    const input = `String yield;`;
    expect(() => javaParser.parse(input, "blockStatement")).to.not.throw();
  });

  it("should handle yield statements", () => {
    const input = `yield len*len;`;
    expect(() => javaParser.parse(input, "yieldStatement")).to.not.throw();
  });

  it("should handle yield statements in switch case", () => {
    const input = `switch (d) {
	    case SATURDAY: d.ordinal();
            default:
                int len = d.toString().length();
                yield alen*len;

        }`;
    expect(() => javaParser.parse(input, "switchStatement")).to.not.throw();
  });

  it("should handle return statements switch case", () => {
    const input = `return switch (d) {
      case SATURDAY, SUNDAY -> d.ordinal();
            default -> {
                int len = d.toString().length();
                yield len*len;
            }
        };`;
    expect(() => javaParser.parse(input, "returnStatement")).to.not.throw();
  });
});

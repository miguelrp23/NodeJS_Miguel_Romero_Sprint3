"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const modulo = require("./modulo");
jest.mock("fs");
describe("modulo", () => {
    it("should filter files by extension", (done) => {
        const folder = "/test-folder";
        const ext = "txt";
        const files = ["file1.txt", "file2.txt", "file3.md"];
        // Ajustar la implementación del mock para aceptar la ruta y el callback
        fs.readdir.mockImplementation((path, callback) => {
            callback(null, files);
        });
        modulo(folder, ext, (err, lista) => {
            expect(err).toBeNull();
            expect(lista).toEqual(["file1.txt", "file2.txt"]);
            done();
        });
    });
    it("should return an error if readdir fails", (done) => {
        const folder = "/test-folder";
        const ext = "txt";
        const error = new Error("test error");
        // Ajustar la implementación del mock para aceptar la ruta y el callback
        fs.readdir.mockImplementation((path, callback) => {
            callback(error, null);
        });
        modulo(folder, ext, (err, lista) => {
            expect(err).toBe(error);
            expect(lista).toBeUndefined();
            done();
        });
    });
});
//# sourceMappingURL=app.test.js.map
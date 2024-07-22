import {} from "./modulo";
import {} from "./app";

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
    fs.readdir.mockImplementation((path: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
      callback(null, files);
    });

    modulo(folder, ext, (err: NodeJS.ErrnoException | null, lista: string[] | undefined) => {
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
    fs.readdir.mockImplementation((path: string, callback: (err: NodeJS.ErrnoException | null, files: string[] | null) => void) => {
      callback(error, null);
    });

    modulo(folder, ext, (err: NodeJS.ErrnoException | null, lista: string[] | undefined) => {
      expect(err).toBe(error);
      expect(lista).toBeUndefined();
      done();
    });
  });
});

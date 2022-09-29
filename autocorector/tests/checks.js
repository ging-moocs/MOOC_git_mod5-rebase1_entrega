// IMPORTS
const git = require('simple-git/promise');
const Utils = require("../utils/testutils");
const path = require('path');
const fs = require('fs-extra');


// CONSTS
const REPO_NAME = 'my_calculator_2';
const PATH_ASSIGNMENT = path.resolve(path.join(__dirname, "../"));
const PATH_REPO = path.join(PATH_ASSIGNMENT, REPO_NAME);

// GLOBALS
let error_critical = null;

let mygit = git(PATH_ASSIGNMENT);
let student = null;
let REPO_URL = "";
describe('Rebase 1', function () {

    it("(Prechecks) Comprobando que existe git_account", async function () {
        this.score = 0;
        this.msg_err = "No se ha encontrado el fichero 'git_account' que debe contener el nombre de usuario de github";

        student = fs.readFileSync(path.join(PATH_ASSIGNMENT, 'git_account'), {encoding: 'utf8'}).replace(/^\s+|\s+$/g, '');;
        REPO_URL = `git@github.com:${student}/${REPO_NAME}.git`;

        this.msg_ok = `Se ha encontrado el fichero 'git_account': ${student}`;
        should.exist(student);
    });

    it("(Prechecks) Buscando la rama main", async function () {
        this.score = 1;
        this.msg_ok = `Se ha encontrado la rama main en ${REPO_URL}`;
        [_, _] = await Utils.to(fs.remove(PATH_REPO));
        [error_repo, _] = await Utils.to(mygit.clone(REPO_URL));
        if (error_repo) {
            this.msg_err = `No se encuentra rama main en ${REPO_URL}`;
            error_critical = this.msg_err;
            should.not.exist(error_critical);
        }
        await Utils.to(mygit.cwd(PATH_REPO));
        should.not.exist(error_repo);
    });

    it("Comprobando si está x^3 en el contenido tras el rebase de main", async function () {
        const expected = "x^3";
        this.score = 1.5;
        this.msg_err = `Ha habido un problema al buscar '${expected}' en el contenido tras el rebase de main`;

        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            [err_show, output] = await Utils.to(mygit.show(["HEAD:index.html"]));
            this.msg_ok = `Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            this.msg_err = `NO Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });


    it("Comprobando si está x^4 en el contenido tras el rebase de main", async function () {
        const expected = "x^4";
        this.score = 1.5;
        this.msg_err = `Ha habido un problema al buscar '${expected}' en el contenido tras el rebase de main`;

        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            [err_show, output] = await Utils.to(mygit.show(["HEAD:index.html"]));
            this.msg_ok = `Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            this.msg_err = `NO Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("Comprobando si está x^2 en el contenido tras el rebase de main", async function () {
        const expected = "x^2";
        this.score = 3;
        this.msg_err = `Ha habido un problema al buscar '${expected}' en el contenido tras el rebase de main`;

        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            [err_show, output] = await Utils.to(mygit.show(["HEAD:index.html"]));
            this.msg_ok = `Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            this.msg_err = `NO Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("Comprobando si está 1/x en el contenido tras el rebase de main", async function () {
        const expected = "1/x";
        this.score = 3;
        this.msg_err = `Ha habido un problema al buscar '${expected}' en el contenido tras el rebase de main`;

        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            let output;
            [err_show, output] = await Utils.to(mygit.show(["HEAD:index.html"]));
            this.msg_ok = `Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            this.msg_err = `NO Se ha encontrado '${expected}' en el contenido tras el rebase de main`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

});

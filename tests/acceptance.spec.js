const request = require("supertest");
const { spawn } = require("child_process");
const fs = require("fs");

const BASE = process.env.APONTTE_BASE || "http://localhost:3000/local";
const API_KEY =
  process.env.APONTTE_API_KEY || "The0Quick1Brown2Fox3Jumps4-Over5A6Lazy7Dog8";

const post = (path) =>
  request(BASE)
    .post(path)
    .set("ContentType", "application/json")
    .set("Accept", "application/json");

const put = (path) =>
  request(BASE)
    .put(path)
    .set("ContentType", "application/json")
    .set("Accept", "application/json");

const get = (path) =>
  request(BASE)
    .get(path)
    .set("ContentType", "application/json")
    .set("Accept", "application/json");

const create = (contract) => post("/").send(contract);
const createOk = (contract, done) =>
  create(contract)
    .expect(201)
    .then((res) => done(res.body.id));
const createNok = (contract) =>
  create(contract).catch((e) => expect(e).toBeTruthy());

const update = (id, contract) => put(`/${id}`).send(contract);
const updateOk = (id, contract) => update(id, contract).expect(200);
const updateNok = (id, contract) =>
  update(id, contract).catch((e) => expect(e).toBeTruthy());

const hup = (id) => put(`/${id}/hup`);
const hupOk = (id) => hup(id).expect(200);
const hupNok = (id) => hup(id).catch((e) => expect(e).toBeTruthy());

const grant = (id, type) => get(`/${id}/photos/${type}`);
const grantOk = (id, type) => grant(id, type).expect(200);
const grantNok = (id, type) =>
  grant(id, type).catch((e) => expect(e).toBeTruthy());

const approve = (id, approved) =>
  post(`/${id}/approval`).set("x-api-key", API_KEY).send(approved.toString());
const approveOk = (id, approval) => approve(id, approval).expect(200);
const approveNok = (id, approval) =>
  approve(id, approval).catch((e) => expect(e).toBeTruthy());

const contractInfo = (actual = {}, time = new Date().getTime()) => ({
  fullName: `Mercano El Marciano ${time}`,
  cpf: "012.345.678-90",
  email: "mercano@marciano.el",
  requestedValue: 30000,
  ...actual,
});

const uploadImage = (signedData, id, type) => {
  // TODO: make image uploads
  const destDir = `${__dirname}/s3/apontte-contract-local/${id}`;
  spawn("mkdir", ["-p", destDir]);
  spawn("cp", [`${__dirname}/casos-de-uso.svg`, `${destDir}/${type}`]);
};

describe("No Contract", () => {
  const NOT_AN_ID = "adsfadsfasdfasdfads";
  const NOT_AN_IMG = "asdfasd";

  it("Update Fail", async () => updateNok(NOT_AN_ID, {}));
  it("Grant Fail", async () => grantNok(NOT_AN_ID, NOT_AN_IMG));
  it("Hup Fail", async () => hupNok(NOT_AN_ID));
  it("Approve Fail", async () => approveNok(NOT_AN_ID, true));
  it("Create Succeed", async () => createOk(contractInfo(), (id) => id));
});

describe("Existing Contract", () => {
  let id = null;
  beforeEach(() => createOk(contractInfo(), (newId) => (id = newId)));

  it("Grant Fail", () => grantNok(id, "identity"));
  it("Approve Fail", () => approveNok(id, true));
  it("Update Succeed", () => updateOk(id, { monthlyIncome: 10 }));
  it("Hup Succeed", () => hupOk(id));
});

describe("Images of contract", () => {
  let id = null;

  beforeEach(async () => {
    await createOk(contractInfo(), (newId) => (id = newId));
    await hupOk(id);
  });

  it("Approve Fail", () => approveNok(id, true));
  it("Hup Fail", () => hupNok(id));
  it("Update Succeed", () => updateOk(id, { monthlyIncome: 10 }));
  it("Grant Succeed", async () => {
    const grantData = await grantOk(id, "identity");
    await uploadImage(grantData.body, id, "identity");
  });
  it("Hup Succeed", async () => {
    const grantData = await grantOk(id, "identity");
    await uploadImage(grantData.body, id, "identity");
    await hupOk(id);
  });
});

describe("Approval Contract", () => {
  let id = null;

  beforeEach(async () => {
    await createOk(contractInfo(), (newId) => (id = newId));
    await hupOk(id);
    const grantData = await grantOk(id, "identity");
    await uploadImage(grantData.body, id, "identity");
    await hupOk(id);
  });

  it("Update Succeed", () => updateOk(id, { monthlyIncome: 10 }));
  it("Grant Succeed", () => grantOk(id, "identiy"));
  it("Hup Fail", () => hupNok(id));
  it("Approve Succeed", () => approveOk(id, true));
});

describe("Finalized Contract", () => {
  let id = null;

  beforeEach(async () => {
    await createOk(contractInfo(), (newId) => (id = newId));
    await hupOk(id);
    const grantData = await grantOk(id, "identity");
    await uploadImage(grantData.body, id, "identity");
    await hupOk(id);
    await approveOk(id, true);
  });

  it("Update Fail", () => updateNok(id, { monthlyIncome: 10 }));
  it("Grant Fail", () => grantNok(id, "identiy"));
  it("Hup Fail", () => hupNok(id));
  it("Approve Fail", () => approveNok(id, true));
});
